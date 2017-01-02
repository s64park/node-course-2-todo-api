/**
 * Created by Terry on 2017-01-01.
 */
const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
//var id = '5869ad065e1ba30294206f7f';
//if (!ObjectID.isValid(id)) {
//    console.log('ID not valid');
//}

/*
Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log('Id not found');
    }
    console.log('Todo By Id', todo);
}).catch(e => console.log(e));
*/

var id = "58696fe08ea3cc1c98665209";
User.findById(id).then(user => {
    if (!user) {
        return console.log('user not found');
    }
    console.log('User by Id', user);
}).catch(e => console.log(e));