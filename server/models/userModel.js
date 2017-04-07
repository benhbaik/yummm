var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4,
        maxLength: 16,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        maxLength: 16,
        select: false
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    var salt = bcrypt.genSalt(12, function(err, result) {
        if (err) {
            return next(err);
        }
        if (result) {
            return result;
        }
    });

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {

        if (err) return next(err);

        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);
