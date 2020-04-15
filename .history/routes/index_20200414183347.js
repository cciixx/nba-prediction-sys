var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/Users/cc/GraduateThesis/ajax_test/public/first.html');
});

module.exports = router;
