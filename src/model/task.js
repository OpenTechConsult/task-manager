const mongoose = require('mongoose')
const validator = require('validator')

const { Schema, model } = mongoose

// create task schema
const taskSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    }, 
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

//Create a task model
const Task = model('Task', taskSchema)
module.exports = Task