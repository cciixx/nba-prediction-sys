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
        name: rows[1]["name"],
        birthday: rows[1]["birth_date"],
        height: rows[1]["height"],
        weight: rows[1]["weight"],
        pos: rows[1]["position"],
        gp: rows[1]["games_played"],
        pts: rows[1]['points'],
        reb: rows[1]["total_rebounds"],
        ast: rows[1]["assists"],
        fgp: rows[1]["field_goal_percentage"],
        tfgp: rows[1]["three_point_percentage"],
        ftfgp: rows[1]["free_throw_percentage"] 
      }
      rosterData.push(t);
      console.log(JSON.stringify(rosterData));
    });
});

module.exports = router;
