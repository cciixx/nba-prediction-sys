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
      console.log(rows[0])

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