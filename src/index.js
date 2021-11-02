const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')


const User = require('./model/user')
const Task = require('./model/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// application middleware
app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.send('GET request are disabled')
    } else {
        next()
    }
})

app.use((req, res, next) => {
    res.status(503).send('Site is currently down. Check back soon')
});

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
