var express = require('express');
var router = express.Router();
var connectEnsureLogin = require('connect-ensure-login');
var scheduleService = require('../services/scheduleService');

/* POST - Create Schedule listing. */
router.post('/create', connectEnsureLogin.ensureLoggedIn(), scheduleService.createEvent);

/* GET - Get all Schedule listings. */
router.get('/', scheduleService.getSchedule);

/* POST - Update Schedule listing. */
router.post('/update', connectEnsureLogin.ensureLoggedIn(), scheduleService.updateEvent);

/* DELETE - Delete Schedule listing. */
router.delete('/delete', connectEnsureLogin.ensureLoggedIn(), scheduleService.deleteEvent);

/* POST - Import and replace all Schedule listings. */
router.post('/import', connectEnsureLogin.ensureLoggedIn(), scheduleService.importSchedule);

module.exports = router;
