var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var config = require('../config.json');
app.set('secret', config.secret);
var secret = app.get('secret');

exports.createToken = function(user) {
    try {
        return jwt.sign({
            username: user.username,
            _id: user._id
        }, secret, { expiresIn: '12h' });
    } catch(e) {
        return e;
    }
}
exports.verifyToken = function(token) {
    try {
        return jwt.verify(token, secret);
    } catch(e) {
        return e;
    }
};
