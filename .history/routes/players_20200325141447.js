var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  req.db
    .select(
      "name",
      "games_played as gp",
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
      var playerStats = {};
      var gp = parseFloat(results[1]);
      for(let i = 2; i < results.length; i++) {
        if(i < 5) {
          results[i] = parseFloat(results[i]/gp)
        }
      }
      res.status(200).json(results);
    })
    .catch(err => {
      res.status(400).json({ Error: true, Message: err });
    });
});

module.exports = router;
