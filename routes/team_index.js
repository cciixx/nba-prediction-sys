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
        metaData['team_code'] = rows[i]["team_code"];
        data.push(metaData);
      }
      res.status(200).send(JSON.stringify(data));
    })
    .catch(err => {
      res.status(400).json({ "Error": true, "Message": err })
    })
});

module.exports = router;
