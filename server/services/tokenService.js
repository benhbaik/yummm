var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var config = require('../config.json');

exports.createToken = function(user) {
    app.set('secret', config.secret);
    var secret = app.get('secret');
    return jwt.sign(user, secret, { expiresIn: '1h' });
}
