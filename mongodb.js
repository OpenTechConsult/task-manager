// CRUD create read update delete
// const mongodb = require('mongodb');

// Init MongoClient from mongodb
// const MongoClient = mongodb.MongoClient;
// const ObjectID    = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

// connection string variables
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// Generate Id from ObjectID object
const id = new ObjectID();
console.log(id.toString());
console.log(id.getTimestamp());
console.log(id.id.length);
console.log(id.toHexString().length);

// connect to the database server
MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database server');
    }

    console.log('Connected successfully to the database server');
    // create the database and have a reference to it
    const db = client.db(databaseName);

    // create a collection 'users'
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Akoua',
    //     age: 26
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert the user');
    //     }

    //     console.log(result.insertedId);
    // });


    // db.collection('users').insertMany([
    //     { name: 'Deborah', age: 36},
    //     { name: 'Yvonne', age: 42},
    // ], (error, results) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!');
    //     }
    //     console.log(results.insertedIds);
    // });

    // db.collection('tasks').insertMany([
    //     {description: 'Task one', completed: true},
    //     {description: 'Task two', completed: false},
    //     {description: 'Task three', completed: false},
    // ], (error, results) => {
    //     if (error) {
    //         return console.log('Unable to insert documents');
    //     }

    //     console.log(results.insertedIds);
    // });
});
