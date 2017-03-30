var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var config = require('../config.json');
app.set('secret', config.secret);
var secret = app.get('secret');

exports.createToken = function(user) {
    try {
        return jwt.sign(user, secret, { expiresIn: '1h' });
    } catch(e) {
        return e;
    }
}
