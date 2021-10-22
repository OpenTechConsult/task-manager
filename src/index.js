const express = require('express')
require('./db/mongoose')
const User = require('./model/user')
const Task = require('./model/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/users' , (req , res)=>{
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save()
    .then(() => { res.send(task) })
    .catch((err) => { res.status(400)})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))