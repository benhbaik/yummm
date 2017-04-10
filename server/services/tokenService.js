'use strict';

var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var config = require('../config.json');
app.set('secret', config.secret);

exports.createToken = function(user) {
        return jwt.sign(
            {
                username: user.username,
                _id: user._id
            },
            app.get('secret'),
            { expiresIn: '12h' }
        );
};
exports.verifyToken = function(req, res, next, token) {
    jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
            res.json({
                success: false,
                message: 'Failed to authenticate token.'
            });
        }
        if (decoded) {
            req.decoded = decoded;
            next();
        }
    });
};
