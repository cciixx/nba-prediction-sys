var express = require("express");
var router = express.Router();

/* GET team page. */
router.get("/:TeamCode", function (req, res, next) {
  req.db
    .select('*')
    .from("team")
    .leftJoin("player", "team.team_code", "player.team_abbreviation")
    .where({
      team_code: req.params.TeamCode
    })
    .then(rows => {
      const teamAll = rows[0];
      const teamLogoPath = "/images/" + teamAll.team_code + ".png";
      var teamData = {
        name: teamLogoPath,
        team_name: teamAll["name_zh"],
        win: teamAll["wins"],
        lose: teamAll["loses"],
        rank: teamAll["rank"],
        gm: teamAll["gm"],
        hc: teamAll["hc"],
        pts: teamAll["pts"],
        ast: teamAll["ast"],
        stl: teamAll["stl"],
        reb: teamAll["reb"],
        tov: teamAll["tov"]
      };
      var rosterData = []
      for(let i = 0; i < rows.length; i++) {
        var t = {
          name: rows[i]["name"],
          birthday: rows[i]["birth_date"],
          height: rows[i]["height"],
          weight: rows[i]["weight"],
          pos: rows[i]["position"],
          gp: rows[i]["games_played"],
          pts: rows[i]['points'],
          reb: rows[i]["total_rebounds"],
          ast: rows[i]["assists"],
          fgp: rows[i]["field_goal_percentage"],
          tfgp: rows[i]["three_point_percentage"],
          ftfgp: rows[i]["free_throw_percentage"] 
        }
        rosterData.push(t);
      }
      teamData['roster'] = rosterData;
      console.log(teamData);
    });
});

module.exports = router;
