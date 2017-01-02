/**
 * Created by Terry on 2017-01-01.
 */
var mongoose = require('mongoose')

//User model
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = { User };