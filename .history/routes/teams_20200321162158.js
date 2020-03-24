var express = require("express");
var router = express.Router();

/* GET team page. */
router.get("/:TeamCode", function(req, res, next) {
  req.db
    .from("teams")
    .select("*")
    .where({
      team_code: req.params.TeamCode
    })
    .then(rows => {
      const teamInfo = rows[0];
      const teamLogoPath = "/images/" + teamInfo.team_code + ".png";
      var roster = rows[0].roster.split(",");
      for (let i = 0; i < roster.length; i++) {
        var suf = "(TW)";
        if (roster[i].includes(suf)) {
          roster[i] = roster[i].replace(suf, "").trimEnd();
        }
        else continue
      }
      return roster;
    })
    .then(roster => {
      req.db
        .from("player_stats")
        .select("name",
        "birth_date as birthday",
        "weight",
        "position as pos",
        "games_played as gp",
        "points as pts",
        "total_rebounds as reb",
        "assists as ast",
        "field_goal_percentage as fgp",
        "three_point_percentage as tfgp",
        "free_throw_percentage as ftfgp")
        .then(rows => {
          console.log(JSON.stringify(rows[0]))
        })
    })
});

module.exports = router;
