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

    // update the field name to 'Ghislaine' where object ID is 616366014142b07d6083856d
    const updatePromise = db.collection('users').updateOne({ 
        _id: new ObjectID("616366014142b07d6083856d")
    }, { 
        $set: { 
            name: 'Ghislaine'
        }
    });
    
    updatePromise.then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    });
});
