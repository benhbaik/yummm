var User = require('../models/userModel.js');
var tokenService = require('./tokenService.js');

exports.save = function(req, res) {
    var user = new User();

    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err, user) {
        if (err) {
            res.json(err);
        }
        if (user) {
            var payload = {
                username: user.username,
                _id: user._id
            };
            res.json({
                message: 'User created!',
                token: tokenService.createToken(payload)
            });
        }
    });
}
exports.list = function(req, res) {
    User.find(function(err, users) {
        if (err) {
            res.json(err);
        }
        if (users) {
            res.json(users);
        }
    });
}
exports.listOne = function(req, res) {
    var userId = { _id: req.params.id };
    User.findOne(userId, function(err, user) {
        if (err) {
            res.json(err);
        }
        if (user) {
            res.json(user);
        }
    });
}
exports.update = function(req, res) {
    var userId = { _id: req.params.id };
    var userUpdate = {
        username: req.body.username,
        password: req.body.password
    };
    User.findOneAndUpdate(userId, userUpdate, {new: true}, function(err, updatedUser) {
        if (err) {
            res.json(err);
        }
        if (updatedUser) {
            res.json(updatedUser);
        }
    });
}
exports.remove = function(req, res) {
    var userId = req.params.id;
    User.findOneAndRemove(userId, function(err, success) {
        if (err) {
            res.json(err);
        }
        if (success) {
            res.json(success);
        }
    });
}
exports.login = function(req, res) {
    var username = { username: req.body.username };
    var password = req.body.password;

    User.findOne(username, 'username password', function(err, user) {
        if (err) {
            res.json(err);
        }
        if (user) {
            if (user.comparePassword(password)) {
                var payload = {
                    username: user.username,
                    _id: user._id
                };
                res.json({
                    success: true,
                    message: 'You are logged in.',
                    token: tokenService.createToken(payload)
                });
            }

            if (!user.comparePassword(password)) {
                res.json({
                    success: false,
                    message: 'Sorry, the password does not match.'
                });
            }
        }
        if (!user) {
            res.json({
                success: false,
                message: 'Username is incorrect.'
            });
        }
    });
}
