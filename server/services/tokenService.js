var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var config = require('../config.json');
app.set('secret', config.secret);

exports.createToken = function(user) {
    // TODO added async callback to handle error
    try {
        return jwt.sign({
            username: user.username,
            _id: user._id
        }, app.get('secret'), { expiresIn: '12h' });
    } catch(e) {
        return e;
    }
}
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
