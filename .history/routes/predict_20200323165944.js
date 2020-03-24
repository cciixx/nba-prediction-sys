var express = require('express');
var router = express.Router();
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);
// const child_process = require('child_process');

router.post('/', function(req, res, next) {
    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      
      ls.on('close', (code) => {
        console.log(`子进程退出，退出码 ${code}`);
      });  
});

module.exports = router;
