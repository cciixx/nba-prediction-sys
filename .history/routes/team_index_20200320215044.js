var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  req.db
    .from("teams")
    .select("team_code", "name_zh")
    .then(rows => {
      var data = [];
      
      for (let i = 0; i < rows.length; i++) {
        var metaData = {}
        metaData['logo_path'] = '/images/' + rows[i]["team_code"] + '.png';
        metaData['names'] = rows[i]["name_zh"];
        data.push(metaData);
      }
      // console.log(data);
      res.send(JSON.stringify(data));
    });
});

module.exports = router;
