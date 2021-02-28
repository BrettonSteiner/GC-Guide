var express = require('express');
var router = express.Router();
var connectEnsureLogin = require('connect-ensure-login');
var semesterService = require('../services/semesterService');

/* POST - Create Semester listing. */
router.post('/create', connectEnsureLogin.ensureLoggedIn(), semesterService.createSemester);

/* GET - Get all Semester listings. */
router.get('/all', connectEnsureLogin.ensureLoggedIn(), semesterService.getSemesters);

/* POST - Get a single Semester listing with all fields populated. */
router.post('/', connectEnsureLogin.ensureLoggedIn(), semesterService.getSemester);

/* GET - Get active Semester. */
router.get('/active', semesterService.getActiveSemester);

/* POST - Update College listing. */
router.post('/updateActiveFlag', connectEnsureLogin.ensureLoggedIn(), semesterService.updateSemesterActiveFlag);

/* DELETE - Delete College listing. */
router.delete('/delete', connectEnsureLogin.ensureLoggedIn(), semesterService.deleteSemester);

module.exports = router;
