var express = require('express');
var router = express.Router();
const { exec } = require('child_process');
// var spawn = require("child_process").spawn;

router.get('/', function(req, res, next) {
    // var runPy = spawn('python3', ["./algorithms/predict.py", req.body.home, req.body.away]);
    // runPy.stdout.on("data", (data) => {
    //     res.send(JSON.parse(data.toString().replace(/'/g, "\"")))
    // })
    // runPy.stderr.on("data", (data) => {
    //     console.error(data.toString())
    // })
    exec(`python3 ./algorithms/predict.py "${req.query.home}" "${req.query.away}"`, (error, stdout, stderr) => {
        if (error != null) {
            res.status(400).json({ "Error": true, "Message": error.message })
          return;
        } else {
            var data = JSON.parse(stdout.replace(/'/g, "\""));
            res.status(200).json({ "playerData": data});
        }
      });
});

module.exports = router;
