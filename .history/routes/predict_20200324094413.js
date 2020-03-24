var express = require('express');
var router = express.Router();
const { exec } = require('child_process');
// const child_process = require('child_process');

router.post('/', function(req, res, next) {
    var teams = req.body;
    var homeWp, awayWp;
    exec(`python3 ./algorithms/predict.py "${teams.home}" "${teams.away}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
});

module.exports = router;
