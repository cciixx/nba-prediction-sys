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
      var roster = rows[0].roster.split(",");
      for (var player in roster) {
        var suf = "(TW)";
        if (player.includes(suf)) {
          player = player.replace(suf, "").trimEnd();
        }
        else continue
      }
      console.log(roster);
    })
});

module.exports = router;
