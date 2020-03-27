var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.db
    .select('games_played','points','total_rebounds','assists','field_goal_percentage','free_throw_percentage','three_point_percentage','effective_field_goal_percentage','player_efficiency_rating','win_shares')
    .from("player")
    .where({
      player_id: req.query.id
    })
    .then(rows => {
      var dataSource = [['分数','能力']];
      var disp = ['场均得分','场均篮板','场均助攻','投篮命中率','罚球命中率','三分命中率','有效命中率','胜利贡献率']
      var results = Object.values(rows[0]);
      var stats = []
      for (let i = 1; i < results.length; i++) {
        var gp;
        if(i == 0) {
          gp = parseFloat(results[i]);
        }
        else if(i > 0 && i < 3) {
          var t = parseFloat(results[i]);
          var val = t/gp;
          stats.push(val)
        }
      }
      // for(let i = 0; i < disp.length; i++) {
      //   var metaData = [];
      //   metaData.push(parseFloat(results[i]));
      //   metaData.push(disp[i]);
      //   dataSource.push(metaData);
      // }
      console.log(stats);
      // res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json({ "Error": true, "Message": err });
    })
});

module.exports = router;
