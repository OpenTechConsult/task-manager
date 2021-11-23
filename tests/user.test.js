const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')

const User = require('../src/model/user')

const userOne = {
    name: 'Deborah',
    email: 'damegantse@otr.tg',
    password: 'azerty123'
}

beforeEach(async () => {
    console.log('runs before each test')
    await User.deleteMany()
    await new User(userOne).save()
})

afterAll(async () => {
    await mongoose.connection.close()
})

test('should sign up a new user', async () => {
    await request(app).post('/users').send({ 
        name: 'Sandro',
        email: 'eagboka@otr.tg',
        password: 'azerty123'
    }).expect(201)
})

test('should log in existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('should not login non existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'yamegantse@gmail.com',
        password: 'bipbip'
    }).expect(400)
})
