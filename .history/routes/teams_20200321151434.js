var express = require("express");
var router = express.Router();

/* GET team page. */
router.get("/:TeamCode", function(req, res, next) {
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
      var rStatName = ['name', 'birth_date', 'height', 'weight', 'pos', 'gp', 'pts', 'reb', 'ast', 'fgp', 'trgp', 'ftfgp'];
      for(let i = 0; i < roster.length; i++) {
        var suf = "(TW)";
        if(roster[i].includes(suf)) {
          var tw_player = roster[i].replace(suf, "").trimEnd();
          console.log(tw_player);
        }
        var stats = req.db.from('player_stats').select(rStatName).where({name: roster[i]})
        console.log(stats);
      }
      res.render(req.params.TeamCode, {
        team_logo: teamLogoPath,
        name: teamInfo["name_zh"],
        win: teamInfo["wins"],
        lose: teamInfo["loses"],
        rank: teamInfo["rank"],
        gm: teamInfo["gm"],
        hc: teamInfo["hc"]
      });
    });
});

module.exports = router;
