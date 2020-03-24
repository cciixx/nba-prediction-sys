var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  req.db
    .from("teams")
    .select("team_code", "name_zh")
    .then(rows => {
      var logoPath = {};
      var nameZh = {};
      for (let i = 0; i < rows.length; i++) {
        logoPath[i] = '/images/' + rows[i]["team_code"] + '.png';
        nameZh[i] = rows[i]["name_zh"];
      }
      var output = {}
      output['names'] = JSON.stringify(logoPath)
      console.log(output);
      // console.log(name_zh);
    });
});

module.exports = router;
