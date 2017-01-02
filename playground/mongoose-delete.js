/**
 * Created by Terry on 2017-01-01.
 */
const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}) to remove all
//Todo.remove({}).then((result) => {
//    console.log(result);
//});

//Todo.findOneAndRemove()
//Todo.findByIdAndRemove()

Todo.findByIdAndRemove('5869e73bc70b016c9373a9ff').then((todo) => {
    console.log(todo);
});