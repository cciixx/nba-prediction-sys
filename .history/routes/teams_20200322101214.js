var express = require("express");
var router = express.Router();

/* GET team page. */
router.get("/:TeamCode", function(req, res, next) {
  req.db
    .select(
      "name",
      "birth_date",
      "height",
      "weight",
      "position",
      "game_played",
      "points",
      "total_rebounds",
      "assists",
      "field_goal_percentage",
      "three_point_percentage",
      "free_throw_percentage"
    )
    .from("team")
    .leftJoin("player", "team.team_code", "player.team_abbreviation")
    .where({
      team_code: req.params.TeamCode
    })
    .then(rows => {
      const teamAll = rows[0];
      console.log(JSON.stringify(rows));
      const teamLogoPath = "/images/" + teamAll.team_code + ".png";
      var data = {
        name: teamLogoPath,
        team_name: teamAll["name"],
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
    });
});

module.exports = router;
