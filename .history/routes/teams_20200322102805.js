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
      // for(let i = 0; i < rows.length; i++) {

      // }
      var t = {
        name: teamAll["name"],
        birthday: teamAll["birth_date"],
        height: teamAll["height"],
        weight: teamAll["weight"],
        pos: teamAll["position"],
        gp: teamAll["games_played"],
        pts: teamAll['points'],
        reb: teamAll["total_rebounds"],
        ast: teamAll["assists"],
        fgp: teamAll["field_goal_percentage"],
        tfgp: teamAll["three_point_percentage"],
        ftfgp: teamAll["free_throw_percentage"] 
      }
      rosterData.push(t);
      console.log(JSON.stringify(rosterData));
    });
});

module.exports = router;
