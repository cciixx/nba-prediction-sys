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
          results[i] = parseFloat(results[i]) * 100
        }
      }
      
      var data = {
        name: results[1],
        height: results[2],
        weight: results[3],
        pos: results[4],
        stl: results[5],
        reb: results[6],
        ast: results[7],
        fouls: results[8],
        dunk: results[9],
        efgp: results[10]
      }
      console.log(data.name,data.height,data.weight,data.pos,data.stl,data.reb,data.ast,data.fouls,data.dunk, data.efgp)
      // exec(
      //   `python3 ./algorithms/trans.py ${data.name} ${data.height} ${data.weight} ${data.pos} ${data.stl} ${data.reb} ${data.ast} ${data.fouls} ${data.dunk}  ${data.efgp}`,
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