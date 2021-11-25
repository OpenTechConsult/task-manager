const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')

const User = require('../src/model/user')

const userOneID = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneID,
    name: 'Deborah',
    email: 'damegantse@otr.tg',
    password: 'azerty123',
    tokens: [{
        token: jwt.sign({ _id: userOneID}, process.env.JWT_SECRET)
    }]
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
    const response = await request(app).post('/users').send({ 
        name: 'Sandro',
        email: 'eagboka@otr.tg',
        password: 'azerty123'
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response body
    // Assert that the user name is sandro
    expect(response.body).toMatchObject({
        user: {
            name: 'Sandro',
            email: 'eagboka@otr.tg',
        },
        token: user.tokens[0].token
    })
})


test('should log in existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }, ).expect(200)

    const user = await User.findById(userOneID)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login non existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'yamegantse@gmail.com',
        password: 'bipbip'
    }).expect(400)
})

test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})


test('should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    const user = await User.findById(userOneID)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})
