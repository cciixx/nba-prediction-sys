var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.db
    .select('points','total_rebounds','assists','field_goal_percentage','free_throw_percentage','three_point_percentage','effective_field_goal_percentage','player_efficiency_rating','win_shares')
    .from("player")
    .where({
      player_id: req.query.id
    })
    .then(rows => {
      var data = [['分数','能力']];
      var disp = ['场均得分','场均篮板','场均助攻','投篮命中率','罚球命中率','三分命中率','有效命中率','胜利贡献率']
      var stats = Object.values(rows[0]);
      console.log(data);
      for(let i = 0; i < disp.length; i++) {
        var metaData = [];
        metaData.push(stats[i]);
        metaData.push(disp[i]);
        data.push(metaData);
      }
    })
});

module.exports = router;
