var express = require("express");
var router = express.Router();

/* GET team page. */
router.get("/", function (req, res, next) {
  req.db
    .select('*')
    .from("team")
    .leftJoin("player", "team.team_code", "player.team_abbreviation")
    .where({
      team_code: req.query.t_code
    })
    .then(rows => {
      const teamBrief = rows[0];
      const teamLogoPath = "/images/" + teamBrief.team_code + ".png";
      var teamData = {
        name: teamLogoPath,
        team_name: teamBrief["name_zh"],
        win: teamBrief["wins"],
        lose: teamBrief["loses"],
        rank: teamBrief["rank"],
        gm: teamBrief["gm"],
        hc: teamBrief["hc"],
        pts: teamBrief["pts"],
        ast: teamBrief["ast"],
        stl: teamBrief["stl"],
        reb: teamBrief["reb"],
        tov: teamBrief["tov"]
      };
      var rosterData = []
      for(let i = 0; i < rows.length; i++) {
        var t = {
          name: rows[i]["name"],
          birthday: rows[i]["birth_date"],
          height: rows[i]["height"],
          weight: rows[i]["weight"],
          pos: rows[i]["position"],
          gp: rows[i]["games_played"],
          pts: rows[i]['points'],
          reb: rows[i]["total_rebounds"],
          ast: rows[i]["assists"],
          fgp: rows[i]["field_goal_percentage"],
          tfgp: rows[i]["three_point_percentage"],
          ftfgp: rows[i]["free_throw_percentage"],
          player_id: rows[i]["player_id"]
        }
        rosterData.push(t);
      }
      teamData['roster'] = rosterData;
      var data = [teamData];
      res.send(JSON.stringify(data));
    });
});

module.exports = router;
