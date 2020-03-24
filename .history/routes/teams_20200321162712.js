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
      var j = {"name":"Wesley Matthews","birthday":"1986-10-14","weight":"220","pos":"SF-SG","gp":"61","pts":"458","reb":"154","ast":"89","fgp":"0.403","tfgp":"0.368","ftfgp":"0.759"};
      return [roster, j];
    })
    .then(data => {
      console.log(data);
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
