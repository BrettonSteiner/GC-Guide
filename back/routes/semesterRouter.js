var express = require('express');
var router = express.Router();
var semesterService = require('../services/semesterService');

/* POST - Create Semester listing. */
router.post('/create', semesterService.createSemester);

/* GET - Get all Semester listings. */
router.get('/all', semesterService.getSemesters);

/* POST - Get a single Semester listing with all fields populated. */
router.post('/', semesterService.getSemester);

/* POST - Update College listing. */
router.post('/updateActiveFlag', semesterService.updateSemesterActiveFlag);

/* DELETE - Delete College listing. */
router.delete('/delete', semesterService.deleteSemester);

module.exports = router;
