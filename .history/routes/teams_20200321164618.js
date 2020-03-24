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
      const teamAll = rows[0];
      const teamLogoPath = "/images/" + teamAll.team_code + ".png";
      var roster = rows[0].roster.split(",");
      var teamInfo = {
        name: teamLogoPath,
        team_name: teamAll['name'],
        win: teamAll['wins'],
        lose: teamAll['loses'],
        rank: teamAll['rank'],
        gm: teamAll['gm'],
        hc: teamAll['hc'],
        pts: teamAll['pts'],
        ast: teamAll['ast'],
        stl: teamAll['stl'],
        reb: teamAll['reb'],
        tov: teamAll['tov']
      }
      for (let i = 0; i < roster.length; i++) {
        var suf = "(TW)";
        if (roster[i].includes(suf)) {
          roster[i] = roster[i].replace(suf, "").trimEnd();
        }
        else continue
      }
      
      return [roster, JSON.stringify(teamInfo)];
    })
    .then(data => {
      var r = data[0];
      var rAll = [];
      for(let i = 0; i < r.length; i++){
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
        .where({name:r[i]})
        .then(rows => {
          rAll.push(JSON.stringify(rows[0]));
        })
      }
      return rAll;
    })
    .then(rAll => {
      console.log(rAll)
    })
});

module.exports = router;
