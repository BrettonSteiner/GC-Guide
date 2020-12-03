var express = require('express');
var router = express.Router();
var semesterService = require('../services/semesterService');

/* POST - Create College listing. */
router.post('/create', semesterService.createCollege);

/* GET - Get all College listings. */
router.get('/', semesterService.getColleges);

/* POST - Update College listing. */
router.post('/update', semesterService.updateCollege);

/* DELETE - Delete College listing. */
router.delete('/delete', semesterService.deleteCollege);

module.exports = router;
