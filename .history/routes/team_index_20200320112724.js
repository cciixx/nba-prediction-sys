var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  const team_query = req.db
    .from("teams")
    .select("team_code", "name_zh")
    .then(rows => {
      var team_code= [];
      for(let i = 0; i < rows.length; i++) {
        team_code.push(rows[i]['team_code']);
        // name_zh.push(rows[i]['name_zh']);
      }

      console.log(team_code);
    });
});

module.exports = router;
