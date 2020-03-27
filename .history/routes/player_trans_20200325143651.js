var express = require("express");
var router = express.Router();
const { exec } = require("child_process");

router.get("/", function (req, res, next) {
  req.db
    .select('*')
    .from("player")
    .where({
      player_id: req.query.id
    })
    .then(rows => {
      console.log(rows[0])
      exec(
        `python3 ./algorithms/predict.py "Toronto Raptors" "Golden State Warriors"`,
        (error, stdout, stderr) => {
          if (error != null) {
            res.status(400).json({ Error: true, Message: error.message });
            return;
          } else {
            var data = JSON.parse(stdout.replace(/'/g, '"'));
            res.status(200).json(data);
          }
        }
      );
    })
    // .catch(err => {
    //   res.status(400).json({ Error: true, Message: err });
    // });
});

module.exports = router;
