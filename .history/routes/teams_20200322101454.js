var express = require("express");
var router = express.Router();

/* GET team page. */
router.get("/:TeamCode", function(req, res, next) {
  req.db
    .select(
      "name",
      "birth_date as birthday",
      "height",
      "weight",
      "position as pos",
      "games_played as gp",
      "points as pts",
      "total_rebounds as reb",
      "assists as ast",
      "field_goal_percentage as fpg",
      "three_point_percentage as tfgp",
      "free_throw_percentage as ftfgp"
    )
    .from("team")
    .leftJoin("player", "team.team_code", "player.team_abbreviation")
    .where({
      team_code: req.params.TeamCode
    })
    .then(rows => {
      const teamAll = rows[0];
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
        tov: teamAll["tov"],
        roster: JSON.stringify(rows)
      };
      console.log(data);
    });
});

module.exports = router;
