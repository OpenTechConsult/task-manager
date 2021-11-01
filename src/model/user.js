const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const { Schema, model } = mongoose

// Create the userSchema BlueYvi123$
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

// create the pre save middleware
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// create the user Model
const User = model('User', userSchema)

module.exports = User