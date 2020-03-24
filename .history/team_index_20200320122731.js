var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  req.db
    .from("teams")
    .select("team_code", "name_zh")
    .then(rows => {
      var data = {
        "names":{},
        "logo_path":{}
      };
      for (let i = 0; i < rows.length; i++) {
        data['names'][i] = '/images/' + rows[i]["team_code"] + '.png';
        data['logo_path'][i] = rows[i]["name_zh"];
      }
      // console.log(__dirname);
      res.send(data);
      res.sendFile(__dirname + '/public/' + 'team_index.html');
      // res.json(data);
    });
});

module.exports = router;
