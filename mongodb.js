const { MongoClient, ObjectID } = require('mongodb');

// connection string variables
const uri = 'mongodb://127.0.0.1:27017';


const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('task-manager');
        const users    = database.collection('tasks');

        // query for all users with 39 years old
        const query = { description: 'Task three' };
        const result = await users.deleteOne(query);
        if (result.deletedCount === 1) {
            console.log('Successfully deleted one task')
        } else {
            console.log('No task matched the query. Delete 0 documents.');
        }
        console.log("Deleted " + result.deletedCount + " documents");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);