'use strict';

var Table = require('../models/tableModel');

exports.list = function(req, res) {
    Table.findOne({ userId: req.params.id }, function(err, table) {
        if (err) {
            res.json(err);
        }
        if (table) {
            res.json(table.shoppingList);
        }
    });
}

exports.add = function(req, res) {
    Table.findOneAndUpdate(
        { userId: req.params.id },
        { $push: { shoppingList: { $each: req.body.items } } },
        { new: true },
        function(err, update) {
            if (err) {
                res.json(err);
            } else if (update) {
                res.json(update.shoppingList);
            }
        }
    )
}

exports.update = function(req, res) {
    Table.findOneAndUpdate(
        { userId: req.params.id, 'shoppingList.id': req.body.item.id },
        { $set: { 'shoppingList.$.item': req.body.item.item } },
        { new: true },
        function(err, update) {
            if (err) {
                res.json(err);
            } else if (update) {
                res.json(update.shoppingList);
            }
        }
    );
}

exports.remove = function(req, res) {
    Table.findOneAndUpdate(
        { userId: req.params.id },
        { $pull: { shoppingList: req.body.item } },
        { new: true },
        function(err, update) {
            if (err) {
                res.json(err);
            } else if (update) {
                res.json(update.shoppingList);
            }
        }
    )
}
