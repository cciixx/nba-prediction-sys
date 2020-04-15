var express = require("express");
var router = express.Router();
const { exec } = require("child_process");

router.post("/", function(req, res, next) {
  exec(
    `python3 ./bin/algorithms/predict.py "${req.body.home}" "${req.body.away}"`,
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
});

module.exports = router;
