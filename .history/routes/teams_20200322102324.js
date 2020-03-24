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
        name: ,
        birthday: ,
        height: ,
        weight: ,
        pos: ,
        gp: ,
        pts: ,
        reb: ,
        ast: ,
        fgp: ,
        tfgp: ,
        ftfgp: 
      }
    });
});

module.exports = router;
