/**
 * Created by Terry on 2017-01-01.
 */
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
// save new something

module.exports = { mongoose };