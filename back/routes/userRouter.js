var express = require('express');
var router = express.Router();
var userService = require('../services/userService');

/* GET users listing. */
router.get('/', userService.getUsers);

/* GET create user test. */
router.get('/create', userService.createUser);

module.exports = router;
