var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  req.db
    .select('*')
    .from("player")
    .where({
      player_id: req.query.id
    })
    .then(rows => {
      exec(
        `python3 ./algorithms/predict.py "Toronto Raptors" "Golden State Warriors"`,
        (error, stdout, stderr) => {
          console.log(stdout)
        }
      );
    })
    // .catch(err => {
    //   res.status(400).json({ Error: true, Message: err });
    // });
});

module.exports = router;
