// CRUD create read update delete
const mongodb = require('mongodb');

// Init MongoClient from mongodb
const MongoClient = mongodb.MongoClient;

// connection string variables
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// connect to the database server
MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database server');
    }

    console.log('Connected successfully to the database server');
    // create the database and have a reference to it
    const db = client.db(databaseName);

    // create a collection 'users'
    db.collection('users').insertOne({
        name: 'Sandro',
        age: 39
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert the user');
        }

        console.log(result.insertedId);
    });
});