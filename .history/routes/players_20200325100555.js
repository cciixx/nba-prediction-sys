var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.db
    .select('*')
    .from("player")
    .where({
      player_id: req.query.id
    })
    .then(rows => {
      var data = [];
      vsa
    })
});

module.exports = router;
