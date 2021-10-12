const { MongoClient, ObjectID } = require('mongodb');

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

    db.collection('users').findOne({ _id: new ObjectID("6161cb3c16d8569f9b8695ec") }, (err, doc) => {
        if (err) {
            return console.log('Unable to fetch user');
        }

        console.log(doc)
    });

    db.collection('users').find({ age: 39 }).toArray((err, users) => {
        console.log(users);
    });
    
    db.collection('users').find({ age: 39 }).count((err, count) => {
        console.log(count);
    });

    // fetch the last task in tasks collection
    db.collection('tasks').findOne({ _id: new ObjectID("616227842b6ff803476d2c1e") }, (err, task) => {
        if (err) {
            return console.log('Unable to fetch the task');
        }

        console.log(task);
    });

    // fetch all the tasks in tasks collection that are incomplete
    db.collection('tasks').find({ completed: false}).toArray((err, tasks) => {
        console.log(tasks);
    })
});
