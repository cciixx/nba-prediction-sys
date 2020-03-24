var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  req.db
    .from("teams")
    .select("team_code", "name_zh")
    .then(rows => {
      // var logoPath = [];
      // var nameZh = {};
      var output = {
        "names":{},
        "logo_path":{}
      };
      for (let i = 0; i < rows.length; i++) {
        output['names'][i] = '/images/' + rows[i]["team_code"] + '.png';
        output['logo_path'][i] = rows[i]["name_zh"];
      }
      
      // output['names'] = nameZh;
      // output['logo_path'] = logoPath;
      console.log(JSON.stringify(output));
    });
});

module.exports = router;
