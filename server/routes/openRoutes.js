var express = require('express');
var router = express.Router();
var UserService = require('../services/userService');

router.route('/users').
    post(function(req, res) {
        UserService.save(req, res);
    });

router.route('/login').
    post(function(req, res) {
        UserService.login(req, res);
    });

module.exports = router;
