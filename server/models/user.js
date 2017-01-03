/**
 * Created by Terry on 2017-01-01.
 */
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

//this automatically trim return user object.
UserSchema.methods.toJSON = function() {
    var user = this;
    var userOject = user.toObject();
    return _.pick(userOject, ['_id', 'email']);
};

//instance method
UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access }, 'abc123').toString();
    user.tokens.push({ access, token});
    return user.save().then(() => {
        return token;
    });
};

//The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
UserSchema.methods.removeToken = function(token) {
    var user = this;
    return user.update({
        $pull: {
            tokens: {
                token
            }
        }
    })
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        //return new Promise((resolve, reject) => {
        //    reject();
        //});
        return Promise.reject();
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) { resolve(user); }
                else {
                    reject();
                }
            });
        });
    });
};

UserSchema.pre('save', function(next) {
    var user = this;
    // if user.password field is modified or created, run hashing process
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

//User model
var User = mongoose.model('User', UserSchema);

module.exports = { User };