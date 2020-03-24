var express = require('express');
var router = express.Router();
// const { spawn } = require('child_process');
// const ls = spawn('ls', ['-lh', '/usr']);
const child_process = require('child_process');

router.post('/', function(req, res, next) {
    // var teamNames = req.body();
    var workerProcess = child_process.exec(
        `python test.py`,
        function(error, stdout, stderr) {
          if (error) {
            console.log(error.stack)
            console.log('Error code: ' + error.code)
            console.log('Signal received: ' + error.signal)
          }
          console.log('stdout: ' + stdout)
          // console.log('stderr: ' + stderr)
        }
      )
      workerProcess.on('exit', function(code) {
        // console.log('exit code ' + code)
      })

});

module.exports = router;
