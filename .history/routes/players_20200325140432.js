var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.db
    .select('name','games_played as gp','points','total_rebounds','assists','field_goal_percentage','free_throw_percentage','three_point_percentage','effective_field_goal_percentage','player_efficiency_rating','win_shares')
    .from("player")
    .where({
      player_id: req.query.id
    })
    .then(rows => {
      
      // res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json({ "Error": true, "Message": err });
    })
});

module.exports = router;
