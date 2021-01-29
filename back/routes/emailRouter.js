var express = require('express');
var router = express.Router();
var emailService = require('../services/emailService');

/* POST - Send email. */
router.post('/', emailService.sendEmail);

module.exports = router;
