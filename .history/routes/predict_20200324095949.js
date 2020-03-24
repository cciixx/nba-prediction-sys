var express = require('express');
var router = express.Router();
// const { exec } = require('child_process');
var spawn = require("child_process").spawn;

router.post('/', function(req, res, next) {
    var teams = req.body;
    var homeWp, awayWp;
    // exec(`python3 ./algorithms/predict.py "${teams.home}" "${teams.away}"`, (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`exec error: ${error}`);
    //       return;
    //     }
    //     // homeWp = stdout;
    //     // console.log(homeWp);
    //     console.log(`stdout: ${stdout}`);
    //     // console.error(`stderr: ${stderr}`);
    //   });

    var runPy = spawn('python3', ["predict.py", teams.home, teams.away])
    console.log(runPy.stout)
    // runPy.stout.on(data => {
    //     res.send(data);
    // })
});

module.exports = router;
