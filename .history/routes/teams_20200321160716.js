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
        "birth_date",
        "weight",
        "position",
        "games_played",
        "points",
        "total_rebounds",
        "assists",
        "field_goal_percentage",
        "three_point_percentage",
        "free_throw_percentage",
        "name_zh")
        .join('player_stats', 'player_stats.team_abbreviation', '=', 'teams.team_code')
        .then(rows => {
          console.log(rows[0])
        })
    })
});

module.exports = router;
