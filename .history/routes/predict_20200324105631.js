var express = require('express');
var router = express.Router();
// const { exec } = require('child_process');
var spawn = require("child_process").spawn;

router.post('/', function(req, res, next) {
    var runPy = spawn('python3', ["./algorithms/predict.py", req.body.home, req.body.away]);
    runPy.stderr.on("err", (err) => {
        console.log(err)
    })
    runPy.stdout.on("data", (data) => {
        res.send(JSON.parse(data.toString().replace(/'/g, "\"")))
    })
});

module.exports = router;
