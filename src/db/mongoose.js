const mongoose = require('mongoose')
const validator = require('validator')

const uri = 'mongodb://127.0.0.1:27017/task-manager-api'
async function main() {
    
    await mongoose.connect(uri)
    const { Schema, model } = mongoose
    
    // create the user schema
    const userSchema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('Age must be a positive number')
                }
            }

        }
    })

    // const taskSchema = new Schema({
    //     description: {
    //         type: 'string'
    //     }, 
    //     completed: {
    //         type: Boolean,
    //     }
    // })

    // create the user Model
    const User = model('User', userSchema)

    //Create a task model
    // const Task = model('Task', taskSchema)

    // create the object user
    const me = new User({
        name: '   Joseph  ',
        email: 'kakala@otr.tg',
    })

    // create the task object
    // const myTask = new Task({
    //     description: 'Finish this course',
    //     completed: false
    // })

    await me.save()
    // await myTask.save()
    console.log(me)
    // console.log(myTask)

}
main().catch(err => console.log(err))