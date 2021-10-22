const mongoose = require('mongoose')

const uri = 'mongodb://127.0.0.1:27017/task-manager-api'
mongoose.connect(uri)

//const { Schema, model } = mongoose

// const taskSchema = new Schema({
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//     }, 
//     completed: {
//         type: Boolean,
//         default: false,
//     }
// })


// //Create a task model
// const Task = model('Task', taskSchema)


// // create the task object
// const myTask = new Task({
//     description: 'Start validation and sanitization'
// })

// myTask.save()
// console.log(myTask)