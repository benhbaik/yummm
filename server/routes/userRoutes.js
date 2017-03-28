var express = require('express');
var router = express.Router();
var UserService = require('../services/userService');


router.
    route('/users').
        post(function(req, res) {
            UserService.save(req, res);
        }).
        get(function(req, res) {
            UserService.list(req, res);
        });


router.
    route('/users/:id').
        get(function(req, res) {
            UserService.listOne(req, res);
        }).
        put(function(req, res) {
            UserService.update(req, res);
        }).
        delete(function(req, res) {
            UserService.remove(req, res);
        });

router.
    route('/login').
        post(function(req, res) {
            UserService.login(req, res);
        });

router.
    route('/logout').
        post(function(req, res) {
            UserService.logout(req, res);
        });

module.exports = router;
