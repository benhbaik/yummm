'use strict';

var express = require('express');
var router = express.Router();
var UserService = require('../services/userService');
var FavoritesService = require('../services/favoritesService');
var ShoppingListService = require('../services/shoppingListService');
var TokenService = require('../services/tokenService');

router.use(function(req, res, next) {
    var token = req.headers['x-access-token'];

    if (token) {
        TokenService.verifyToken(req, res, next, token);
    }

    if (!token) {
        res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

router.route('/users').
    get(function(req, res) {
        UserService.list(req, res);
    });


router.route('/users/:id').
    get(function(req, res) {
        UserService.listOne(req, res);
    }).
    put(function(req, res) {
        UserService.update(req, res);
    }).
    delete(function(req, res) {
        UserService.remove(req, res);
    });

router.route('/favorites/:id').
    get(function(req, res) {
        FavoritesService.list(req, res);
    }).
    post(function(req, res) {
        FavoritesService.add(req, res);
    });

router.route('/favorites/delete/:id').
    put(function(req, res) {
        FavoritesService.remove(req, res);
    });

router.route('/shopping-list/:id').
    get(function(req, res) {
        ShoppingListService.list(req, res);
    }).
    post(function(req, res) {
        ShoppingListService.add(req, res);
    }).
    put(function(req, res) {
        ShoppingListService.update(req, res);
    });

router.route('/shopping-list/delete/:id').
    put(function(req, res) {
        ShoppingListService.remove(req, res);
    });

module.exports = router;
