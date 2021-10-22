const mongoose = require('mongoose')
const validator = require('validator')

const { Schema, model } = mongoose

// Create the userSchema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(value) {
            if(value.includes('password')) {
                throw new Error('The password must not contain the word password')
            }
        }
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


// create the user Model
const User = model('User', userSchema)

module.exports = User