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
      var data = [['分数','能力']];
      var disp = ['场均得分','场均篮板','场均助攻','投篮命中率','罚球命中率','']
    })
});

module.exports = router;
