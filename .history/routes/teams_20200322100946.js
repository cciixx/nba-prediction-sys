var express = require("express");
var router = express.Router();

/* GET team page. */
router.get("/:TeamCode", function(req, res, next) {
  req.db
    .select('*')
    .from('team')
    .leftJoin('player', 'team.team_code', 'player.team_abbreviation')
    .where({
      team_code: req.params.TeamCode
    })
    .then(rows => {
      const teamAll = rows[0];
      console.log(JSON.stringify(rows));
      // const teamLogoPath = "/images/" + teamAll.team_code + ".png";
      // var roster = rows[0].roster.split(",");
      // var teamInfo = {
      //   name: teamLogoPath,
      //   team_name: teamAll["name"],
      //   win: teamAll["wins"],
      //   lose: teamAll["loses"],
      //   rank: teamAll["rank"],
      //   gm: teamAll["gm"],
      //   hc: teamAll["hc"],
      //   pts: teamAll["pts"],
      //   ast: teamAll["ast"],
      //   stl: teamAll["stl"],
      //   reb: teamAll["reb"],
      //   tov: teamAll["tov"]
      // };
      // for (let i = 0; i < roster.length; i++) {
      //   var suf = "(TW)";
      //   if (roster[i].includes(suf)) {
      //     roster[i] = roster[i].replace(suf, "").trimEnd();
      //   } else continue;
      // }
    })
});

module.exports = router;
