const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')


const User = require('./model/user')
const Task = require('./model/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// fetch multiple users route handler
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.get('/users/:id', (req, res) => {
    
    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(500).send('Invalide object ID')
    }

    User.findById(req.params.id).then((user) => {
        if (user === null) { 
            return res.status(404).send()
        }
        res.send(user)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

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
    .catch((err) => { res.status(400).send(err)})
})

// fetch multiple tasks route handler
app.get('/tasks' , (req , res) => {
    Task.find({}).then(tasks => res.send(tasks)).catch(err => res.status(500).send(err))
})

// fetch a specific task by _id route handler
app.get('/tasks/:id', (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(500).send('Invalid object ID')
    }

    Task.findById(req.params.id).then((task) => {
        if (task === null) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((err) => {
        res.status(500).send(err)
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))