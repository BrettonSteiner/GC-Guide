var express = require('express');
var router = express.Router();

/* POST - Send email. */
router.post('/', function(req, res, next) {
  res.send('respond with an Email confirmation');
});

module.exports = router;
