/**
 * Created by Terry on 2017-01-01.
 */
//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) { return console.log('Unable to connect to MongoDB server'); }
    console.log('Connected to MongoDB server');

    /*db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID("58695c53367ae74f61c42df9")
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then(result => {
        console.log(result);
    });*/

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("586935b1f47f672b9032ff57")
    }, {
        $set: {
            name: 'Inyoung'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then(result => console.log(result));

    //db.close();
});