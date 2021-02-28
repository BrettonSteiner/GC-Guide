var express = require('express');
var router = express.Router();
var connectEnsureLogin = require('connect-ensure-login');
var collegeService = require('../services/collegeService');

/* POST - Create College listing. */
router.post('/create', connectEnsureLogin.ensureLoggedIn(), collegeService.createCollege);

/* GET - Get all College listings. */
router.get('/', collegeService.getColleges);

/* POST - Update College listing. */
router.post('/update', connectEnsureLogin.ensureLoggedIn(), collegeService.updateCollege);

/* DELETE - Delete College listing. */
router.delete('/delete', connectEnsureLogin.ensureLoggedIn(), collegeService.deleteCollege);

/* POST - Import and replace all College listings. */
router.post('/import', connectEnsureLogin.ensureLoggedIn(), collegeService.importColleges);

module.exports = router;
