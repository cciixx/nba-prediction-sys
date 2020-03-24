var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  req.db
    .from("teams")
    .select("team_code", "name_zh")
    .then(rows => {
      var teamBasic = {
        "names":{},
        "logo_path":{}
      };
      for (let i = 0; i < rows.length; i++) {
        teamBasic['names'][i] = '/images/' + rows[i]["team_code"] + '.png';
        teamBasic['logo_path'][i] = rows[i]["name_zh"];
      }
      // console.log(JSON.stringify(teamBasic));
      res.sendFile("../" + __dirname + "/" + "team_index.html");
      res.json(teamBasic);
    });
});

module.exports = router;
