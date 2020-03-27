var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
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
      var results = Object.values(rows[0]);

      var gp = parseFloat(results[0]);
      for (let i = 2; i < results.length; i++) {
        if (i < 5) {
          results[i] = parseFloat((results[i] / gp).toFixed(1))
        }
        else if (i < results.length - 1) {
          results[i] = parseFloat(results[i] * 100)
        }
        else {
          results[i] = parseFloat(results[i])
        }
      }
      var playerStats = {
        "name": results[1],
        "pts": results[2],
        "reb": results[3],
        "ast": results[4],
        "fgp": results[5],
        "ftp": results[6],
        "tpp": results[7],
        "efgp": results[8],
        "pef": results[9],
        "w_share": results[10]
      };
      res.status(200).json(results);
    })
    .catch(err => {
      res.status(400).json({ Error: true, Message: err });
    });
});

module.exports = router;
