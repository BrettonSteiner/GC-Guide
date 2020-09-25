var express = require('express');
var router = express.Router();

/* POST - Create Schedule listing. */
router.post('/create', function(req, res, next) {
    res.send('respond with a Schedule resource');
});

/* GET - Get all Schedule listings. */
router.get('/', function(req, res, next) {
    res.send('respond with a Schedule resource');
});

/* POST - Update Schedule listing. */
router.post('/update', function(req, res, next) {
    res.send('respond with a Schedule resource');
});

/* DELETE - Delete Schedule listing. */
router.delete('/delete', function(req, res, next) {
    res.send('');
});

/* POST - Import and replace all Schedule listings. */
router.post('/import', function(req, res, next) {
    res.send('respond with a Schedule resource');
});

module.exports = router;
