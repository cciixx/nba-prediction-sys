var express = require("express");
var router = express.Router();

/* GET team page. */
router.get("/:TeamCode", function(req, res, next) {
  var roster;
  req.db
    .from("teams")
    .select("*")
    .where({
      team_code: req.params.TeamCode
    })
    .then(rows => {
      const teamInfo = rows[0];
      const teamLogoPath = "/images/" + teamInfo.team_code + ".png";
      roster = rows[0].roster.split(",");
      // console.log(roster);
      // res.render(req.params.TeamCode, {
      //   team_logo: teamLogoPath,
      //   name: teamInfo["name_zh"],
      //   win: teamInfo["wins"],
      //   lose: teamInfo["loses"],
      //   rank: teamInfo["rank"],
      //   gm: teamInfo["gm"],
      //   hc: teamInfo["hc"]
      // });
      return roster;
    });
    console.log(roster);
  // var rosterStat = {};
  // var rStatName = [
  //   "name",
  //   "birth_date",
  //   "height",
  //   "weight",
  //   "pos",
  //   "gp",
  //   "pts",
  //   "reb",
  //   "ast",
  //   "fgp",
  //   "trgp",
  //   "ftfgp"
  // ];
  // for (let i = 0; i < roster.length; i++) {
  //   var suf = "(TW)";
  //   var player_name;
  //   if (roster[i].includes(suf)) {
  //     player_name = roster[i].replace(suf, "").trimEnd();
  //   } else {
  //     player_name = roster[i];
  //   }
  //   req.db
  //     .from("player_stats")
  //     .select(
  //       "name",
  //       "birth_date",
  //       "height",
  //       "weight",
  //       "position",
  //       "game_played",
  //       "points",
  //       "total_rebounds",
  //       "assists",
  //       "field_goal_percentage",
  //       "three_point_percentage",
  //       "free_throw_percentage"
  //     )
  //     .where({ name: player_name })
  //     .then(rows => {
  //       console.log(rows[0]);
  //     });
  // }
});

module.exports = router;
