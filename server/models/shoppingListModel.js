var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TableSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    favorites: []
});

module.exports = mongoose.model('Table', TableSchema);
