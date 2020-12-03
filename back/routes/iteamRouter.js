var express = require('express');
var router = express.Router();
var iteamService = require('../services/iteamService');

/* POST - Create I-Team listing. */
router.post('/create', iteamService.createITeam);

/* GET - Get all I-Team listings. */
router.get('/', iteamService.getITeams);

/* GET - Get all I-Team and associated Complex listings. */
router.get('/public', iteamService.getPublicITeams);

/* POST - Update I-Team listing. */
router.post('/update', iteamService.updateITeam);

/* DELETE - Delete I-Team listing. */
router.delete('/delete', iteamService.deleteITeam);

/* POST - Import and replace all I-Team listings. */
router.post('/import', iteamService.importITeams);

module.exports = router;
