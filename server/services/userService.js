var User = require('../models/userModel.js');
var Table = require('../models/tableModel');
var TokenService = require('./tokenService.js');

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
            Table.create({ userId: user._id }, function(err, table) {
                if (err) {
                    res.json(err);
                }
            });
            res.json({
                success: true,
                message: 'User created!',
                token: TokenService.createToken(payload)
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
    User.findOne({ _id: req.params.id }, function(err, user) {
        if (err) {
            res.json(err);
        }
        if (user) {
            res.json(user);
        }
    });
}
exports.update = function(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.id },
        {
            username: req.body.username,
            password: req.body.password
        },
        { new: true },
        function(err, updatedUser) {
            if (err) {
                res.json(err);
            }
            if (updatedUser) {
                res.json('Successfully updated.');
            }
        }
    );
}
exports.remove = function(req, res) {
    User.findOneAndRemove(req.params.id, function(err, success) {
        if (err) {
            res.json(err);
        }
        if (success) {
            res.json(success);
        }
    });
}
exports.login = function(req, res) {
    var password = req.body.password;

    User.findOne({ username: req.body.username },
        'username password',
        function(err, user) {
            if (err) {
                res.json(err);
            }
            if (user) {
                if (user.comparePassword(req.body.password)) {
                    var payload = {
                        username: user.username,
                        _id: user._id
                    };
                    res.json({
                        success: true,
                        message: 'You are logged in.',
                        token: TokenService.createToken(payload)
                    });
                } else {
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
        }
    );
}
