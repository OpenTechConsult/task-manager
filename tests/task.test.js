const request = require('supertest');
const app = require('../src/app')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

// Load the task model
const Task = require('../src/model/task')

beforeEach(setupDatabase)

// Create the 1st test
test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ description: 'From my test' })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})