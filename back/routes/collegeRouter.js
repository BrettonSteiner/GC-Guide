var express = require('express');
var router = express.Router();
var collegeService = require('../services/collegeService');

/* POST - Create College listing. */
router.post('/create', collegeService.createCollege);

/* GET - Get all College listings. */
router.get('/', collegeService.getColleges);

/* POST - Update College listing. */
router.post('/update', collegeService.updateCollege);

/* DELETE - Delete College listing. */
router.delete('/delete', collegeService.deleteCollege);

/* POST - Import and replace all College listings. */
router.post('/import', collegeService.importColleges);

module.exports = router;
