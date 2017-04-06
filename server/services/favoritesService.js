var Table = require('../models/tableModel.js');

exports.add = function(req, res) {
    Table.findOneAndUpdate(
        { userId: req.params.id },
        { $push: { favorites: req.body.recipe }},
        { new: true },
        function(err, update) {
            if (err) {
                res.json(err);
            }
            if (update) {
                res.json('Added to favorites.');
            }
        }
    );
};

exports.remove = function(req, res) {
    Table.findOneAndUpdate(
        { userId: req.params.id },
        { $pull: { favorites: { uri: req.body.recipe.uri } } },
        { new: true },
        function(err, update) {
            if (err) {
                res.json(err);
            }
            if (update) {
                res.json('Removed from favorites.');
            }
        }
    )
};

exports.list = function(req, res) {
    Table.findOne({ userId: req.params.id }, function(err, table) {
        if (err) {
            res.json(err);
        }
        if (table) {
            res.json(table.favorites);
        }
    });
};
