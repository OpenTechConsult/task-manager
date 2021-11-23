const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')

const User = require('./model/user')
const Task = require('./model/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app