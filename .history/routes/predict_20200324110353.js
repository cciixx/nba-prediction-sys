var express = require('express');
var router = express.Router();
const { exec } = require('child_process');
// var spawn = require("child_process").spawn;

router.post('/', function(req, res, next) {
    // var runPy = spawn('python3', ["./algorithms/predict.py", req.body.home, req.body.away]);
    // runPy.stdout.on("data", (data) => {
    //     res.send(JSON.parse(data.toString().replace(/'/g, "\"")))
    // })
    // runPy.stderr.on("data", (data) => {
    //     console.error(data.toString())
    // })
    exec(`python3 ./algorithms/predict.py "${req.body.home}" "${req.body.away}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error.message}`);
          return;
        }
        // homeWp = stdout;
        // console.log(homeWp);
        console.log(`stdout: ${stdout}`);
        // console.error(`stderr: ${stderr}`);
      });
});

module.exports = router;
