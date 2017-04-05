var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TableSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    favorites: [],
    shoppinglist: []
});

module.exports = mongoose.model('Table', TableSchema);
