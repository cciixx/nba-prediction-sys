var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const team_basic = req.db.from('teams').select('team_code', 'name_zh');
  console.log(team_basic[0]);
});

module.exports = router;
