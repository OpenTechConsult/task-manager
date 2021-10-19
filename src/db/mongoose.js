const mongoose = require('mongoose')

const uri = 'mongodb://127.0.0.1:27017/task-manager-api'
async function main() {

    
    
    await mongoose.connect(uri)
    const { Schema, model } = mongoose
    
    // create the user schema
    const userSchema = new Schema({
        name: {
            type: 'string',
        }, 
        age: {
            type: Number,
        }
    })

    // create the user Model
    const User = model('User', userSchema)

    // create the object user
    const me = new User({
        name: 'Sandro',
        age: 39
    })

    await me.save()
    console.log(me)
}
main().catch(err => console.log(err))