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
      const roster = rows[0].roster.split(",");
      return roster;
      // res.render(req.params.TeamCode, {
      //   team_logo: teamLogoPath,
      //   name: teamInfo["name_zh"],
      //   win: teamInfo["wins"],
      //   lose: teamInfo["loses"],
      //   rank: teamInfo["rank"],
      //   gm: teamInfo["gm"],
      //   hc: teamInfo["hc"]
      // });
    }).then(roster => {
      console.log(roster);
    })
});

module.exports = router;
