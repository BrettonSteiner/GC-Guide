var express = require('express');
var router = express.Router();
var connectEnsureLogin = require('connect-ensure-login');
var iteamService = require('../services/iteamService');

/* POST - Create I-Team listing. */
router.post('/create', connectEnsureLogin.ensureLoggedIn(), iteamService.createITeam);

/* GET - Get all I-Team listings. */
router.get('/', connectEnsureLogin.ensureLoggedIn(), iteamService.getITeams);

/* GET - Get all I-Team and associated Complex listings. */
router.get('/public', iteamService.getPublicITeams);

/* POST - Update I-Team listing. */
router.post('/update', connectEnsureLogin.ensureLoggedIn(), iteamService.updateITeam);

/* DELETE - Delete I-Team listing. */
router.delete('/delete', connectEnsureLogin.ensureLoggedIn(), iteamService.deleteITeam);

/* POST - Import and replace all I-Team listings. */
router.post('/import', connectEnsureLogin.ensureLoggedIn(), iteamService.importITeams);

module.exports = router;
