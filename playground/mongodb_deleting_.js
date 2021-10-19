const { MongoClient, ObjectID } = require('mongodb');

// connection string variables
const uri = 'mongodb://127.0.0.1:27017';


const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('task-manager');
        const users    = database.collection('users');

        // query for all users with 39 years old
        const query = { age: 39 };
        const result = await users.deleteMany(query);
        console.log("Deleted " + result.deletedCount + " documents");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);