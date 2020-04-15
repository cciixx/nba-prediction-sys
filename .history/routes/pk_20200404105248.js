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
            var p2_gp = parseFloat(p2[0]);

            for (let i = 2; i < p1.length; i++) {
                if (i < 5) {
                    p1[i] = parseFloat((p1[i] / p1_gp).toFixed(1))
                    p2[i] = parseFloat((p2[i] / p2_gp).toFixed(1))
                }
                else if (i < results.length - 1) {
                    p1[i] = parseFloat(p1[i] * 100)
                    p2[i] = parseFloat(p2[i] * 100)
                }
                else {
                    p1[i] = parseFloat(p1[i])
                    p2[i] = parseFloat(p2[i])
                }
            }
            
            var data = {
                "name": p1[1],
                "pts": p1[2],
                "reb": p1[3],
                "ast": p1[4],
                "fgp": p1[5],
                "ftp": p1[6],
                "tpp": p1[7],
                "efgp": p1[8],
                "pef": p1[9],
                "w_share": p1[10]
            };
            console.log(data)
            // res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).json({ Error: true, Message: err });
        });
});

module.exports = router;
