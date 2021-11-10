const express = require('express')
const mongoose = require('mongoose')
const Task = require('../model/task')
const auth = require('../middleware/auth')
// require('../db/mongoose')

const router = express.Router();

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body, 
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        //const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// fetch all tasks by owner
router.get('/tasks', auth, async (req , res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id })
        console.log(tasks)
        //const user = await req.user.populate('tasks').execPopulate()
        //console.log(user.tasks)
        res.send(tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

// fetch a specific task by _id route handler
router.get('/tasks/:id', auth, async (req, res) => {

    const _id = req.params.id

    if (!mongoose.isValidObjectId(_id)) {
        return res.status(500).send('Invalid object ID')
    }

    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

});

// GOAL: Refactor DELETE /tasks/:id
//
// 1. Add authentication
// 2. Find the task by _id/owner (findOneAndDelete)
// 3. Test the work
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})



module.exports = router