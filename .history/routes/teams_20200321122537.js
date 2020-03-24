var express = require("express");
var router = express.Router();

/* GET team page. */
router.get("/:TeamCode", function(req, res, next) {
  var a = ['wins', 'loses', 'rank']
  req.db
    .from('teams')
    .select('*')
    .where({
      team_code: req.params.TeamCode
    })
    .then(rows => {
      const teamInfo = rows[0];
      const teamLogoPath = "/images/" + teamInfo.team_code + ".png";
      const roster = rows[0].roster.split(",");
      var rosterStat = {};
      var rStatName = []
      console.log(teamInfo);
      // for(let i = 0; i < roster.length; i++) {
      //   req.db.from('player_stats').select('name', 'birth_date', 'height')
      // }
      // res.render(req.params.TeamCode, {
      //   team_logo: teamLogoPath,
      //   name: teamInfo["name_zh"],
      //   win: teamInfo["wins"],
      //   lose: teamInfo["loses"],
      //   rank: teamInfo["rank"],
      //   gm: teamInfo["gm"],
      //   hc: teamInfo["hc"]
      // });
    });
});

module.exports = router;
