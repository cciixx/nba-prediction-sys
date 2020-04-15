var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    req.db
    .distinct('name')
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
    .from("player")
    .where((builder) => {
        builder.whereIn("name",[req.body.player1, req.body.player2])
    })
    .then(rows => {
        console.log(rows[0]);
        console.log(rows[1]);
    })
});

module.exports = router;
