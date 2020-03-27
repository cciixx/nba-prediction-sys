var express = require("express");
var router = express.Router();
const {
  exec
} = require("child_process");

router.get("/", function (req, res, next) {
  req.db
    .select(
      "games_played as gp",
      "name",
      "height",
      "weight",
      "position as pos",
      "steals as stl",
      "total_rebounds as reb",
      "assists as ast",
      "personal_fouls as fouls",
      "dunks as dunk",
      "effective_field_goal_percentage as efgp",
    )
    .from("player")
    .where({
      player_id: req.query.id
    })
    .then(rows => {
      var results = Object.values(rows[0]);
      var gp = parseFloat(results[0]);
      for (let i = 5; i < results.length; i++) {
        if (i < results.length - 1) {
          results[i] = parseFloat((results[i] / gp).toFixed(1))
        }
        else {
          results[i] = (parseFloat(results[i]) * 100).toFixed(1)
        }
      }
      console.log(results)
      // var data = {
      //   name: 'Maxi Kleber',
      //   height: '6-10',
      //   weight: '240',
      //   pos: 'PF',
      //   stl: '20',
      //   reb: '355',
      //   ast: '77',
      //   fouls: '153',
      //   dunk: '51',
      //   efgp: '0.574'
      // }
      // exec(
      //   `python3 ./algorithms/trans.py `,
      //   (error, stdout, stderr) => {
      //     if (error != null) {
      //       res.status(400).json({
      //         Error: true,
      //         Message: error.message
      //       });
      //       return;
      //     } else {
      //       var data = JSON.parse(stdout.replace(/'/g, '"'));
      //       res.status(200).json(data);
      //     }
      //   }
      // );
    })
  // .catch(err => {
  //   res.status(400).json({ Error: true, Message: err });
  // });
});

module.exports = router;