var express = require('express');
var router = express.Router();
var userService = require('../services/userService');

/* GET users listing. */
router.get('/', userService.getUsers);

module.exports = router;
