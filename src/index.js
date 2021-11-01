const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')


const User = require('./model/user')
const Task = require('./model/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// TODO: CREATE A ROUTER
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// const bcrypt = require('bcryptjs')

// const myfunction = async () => {
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)
//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
//     console.log(isMatch)
// }

// myfunction()