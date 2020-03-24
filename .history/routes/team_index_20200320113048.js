var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  const team_query = req.db
    .from("teams")
    .select("team_code", "name_zh")
    .then(rows => {
      var team_code = {};
      var name_zh = {};
      for(let i = 0; i < rows.length; i++) {
        team_code[i] = rows[i]['team_code'];
        // name_zh.push(rows[i]['name_zh']);
      }

      console.log(JSON.stringify(team_code));
      // console.log(name_zh);
    });
});

module.exports = router;
