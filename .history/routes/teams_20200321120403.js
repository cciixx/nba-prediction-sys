var express = require("express");
var router = express.Router();

/* GET team page. */
router.get("/:TeamCode", function(req, res, next) {
  const a = [];
  a.push('GSW');
  req.db
    .from('teams')
    .select('*')
    .where({
      team_code: a[i]
    })
    .then(rows => {
      const stats = rows[0];
      const teamLogoPath = "/images/" + stats.team_code + ".png";
      const roster = rows[0].roster.split(",");
      // for(let i = 0; i < roster.length; i++) {
      //   req.db.from('player_stats').select('name', 'birth_date', 'height')
      // }
      res.render(req.params.TeamCode, {
        team_logo: teamLogoPath,
        name: stats["name_zh"],
        win: stats["wins"],
        lose: stats["loses"],
        rank: stats["rank"],
        gm: stats["gm"],
        hc: stats["hc"]
      });
    });
});

module.exports = router;
