var express = require("express");
var router = express.Router();
const { exec } = require("child_process");

router.get("/", function(req, res, next) {
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
      "win_shares as w_sahre"
    )
    .from("player")
    .where({
      player_id: req.query.id
    })
    .then(rows => {
      exec(`python3 ./algorithms/trans.py `, (error, stdout, stderr) => {
        if (error != null) {
          res.status(400).json({
            Error: true,
            Message: error.message
          });
          return;
        } else {
          var data = JSON.parse(stdout.replace(/'/g, '"'));
          res.status(200).json(data);
        }
      });
    });
  // .catch(err => {
  //   res.status(400).json({ Error: true, Message: err });
  // });
});

module.exports = router;
