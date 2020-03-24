var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  const teamQuery = req.db
    .from("teams")
    .select("team_code", "name_zh")
    .then(rows => {
      var logoPath = {};
      var name_zh = {};
      for(let i = 0; i < rows.length; i++) {
        logoPath[i] = rows[i]['team_code'];
        name_zh[i] = rows[i]['name_zh'];
      }
      // var output =
      console.log(JSON.stringify(logoPath));
      // console.log(name_zh);
    });
});

module.exports = router;
