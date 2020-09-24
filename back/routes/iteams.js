var express = require('express');
var router = express.Router();

/* POST - Create I-Team listing. */
router.post('/create', function(req, res, next) {
  res.send('respond with an I-Team resource');
});

/* GET - Get all I-Team listings. */
router.get('/', function(req, res, next) {
  res.send('respond with an I-Team resource');
});

/* POST - Update I-Team listing. */
router.post('/update', function(req, res, next) {
  res.send('respond with an I-Team resource');
});

/* DELETE - Delete I-Team listing. */
router.delete('/delete', function(req, res, next) {
  res.send('');
});

/* POST - Import and replace all I-Team listings. */
router.post('/import', function(req, res, next) {
  res.send('respond with an I-Team resource');
});

module.exports = router;
