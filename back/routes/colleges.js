var express = require('express');
var router = express.Router();

/* POST - Create College listing. */
router.post('/create', function(req, res, next) {
    res.send('respond with a College resource');
});

/* GET - Get all College listings. */
router.get('/', function(req, res, next) {
    res.send('respond with a College resource');
});

/* POST - Update College listing. */
router.post('/update', function(req, res, next) {
    res.send('respond with a College resource');
});

/* DELETE - Delete College listing. */
router.delete('/delete', function(req, res, next) {
    res.send('');
});

/* POST - Import and replace all College listings. */
router.post('/import', function(req, res, next) {
    res.send('respond with a College resource');
});

module.exports = router;
