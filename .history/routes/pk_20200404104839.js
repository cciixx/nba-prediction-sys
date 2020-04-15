var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    req.db
        .select(
            "games_played as gp",
            "name",
            "points as pts",
            "total_rebounds as reb",
            "assists as ast",
            "field_goal_percentage as fgp",
            "free_throw_percentage as ftg",
            "three_point_percentage as tpp",
            "effective_field_goal_percentage as efgp",
            "player_efficiency_rating as pef",
            "win_shares as ws"
        )
        .distinct('name')
        .from("player")
        .where((builder) => {
            builder.whereIn("name", [req.body.player1, req.body.player2])
        })
        .then(rows => {
            var p1 = Object.values(rows[0]);
            var p2 = Object.values(rows[1]);

            var p1_gp = parseFloat(p1[0]);
            var p1_gp = parseFloat(p2[0]);

            function statsTrans(playerDataSet, gp) {
                for (let i = 2; i < playerDataSet.length; i++) {
                    if (i < 5) {
                        playerDataSet[i] = parseFloat((playerDataSet[i] / gp).toFixed(1))
                    }
                    else if (i < results.length - 1) {
                        playerDataSet[i] = parseFloat(playerDataSet[i] * 100)
                    }
                    else {
                        playerDataSet[i] = parseFloat(playerDataSet[i])
                    }
                }
            }

            
            // var data = {
            //     "name": results[1],
            //     "pts": results[2],
            //     "reb": results[3],
            //     "ast": results[4],
            //     "fgp": results[5],
            //     "ftp": results[6],
            //     "tpp": results[7],
            //     "efgp": results[8],
            //     "pef": results[9],
            //     "w_share": results[10]
            // };
            // res.status(200).json(playerStats);
        })
        .catch(err => {
            res.status(400).json({ Error: true, Message: err });
        });
});

module.exports = router;
