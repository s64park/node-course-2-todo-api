/**
 * Created by Terry on 2017-01-01.
 */
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
// save new something

module.exports = { mongoose };

