var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  const team_query = req.db
    .from("teams")
    .select("team_code", "name_zh")
    .then(rows => {
      console.log(len(rows));
    });
});

module.exports = router;
