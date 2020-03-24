var express = require('express');
var router = express.Router();
// const { spawn } = require('child_process');
// const ls = spawn('ls', ['-lh', '/usr']);
const child_process = require('child_process');

router.post('/', function(req, res, next) {
    // var teamNames = req.body();
    var workerProcess = child_process.exec(
        `python /public/test.py`)
      workerProcess.on('exit', func÷

});

module.exports = router;
