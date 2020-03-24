var express = require("express");
var router = express.Router();
const { spawn } = require("child_process");
const bat = spawn("cmd.exe", ["/c", "my.bat"]);
// const child_process = require('child_process');

router.post("/", function(req, res, next) {
  const { spawn } = require("child_process");
  const bat = spawn("cmd.exe", ["/c", "my.bat"]);

  bat.stdout.on("data", data => {
    console.log(data.toString());
  });

  bat.stderr.on("data", data => {
    console.error(data.toString());
  });

  bat.on("exit", code => {
    console.log(`Child exited with code ${code}`);
  });
});

module.exports = router;
