const request = require('supertest')
const app = require('../src/app')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

const User = require('../src/model/user')

beforeEach(setupDatabase)


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

    const user = await User.findById(userOneId)
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
    
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/kobe.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

// Goal: Test user updates
// 1. Create "Should update valid user fields"
//      - Update the name of the test user
//      - Check the data to confirm it's changed
// 2. Create "Should not update invalid user fields"
//      - Update a "location" field and expect error status code
test("Should update valid user fields", async () => {
    await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({name: 'Jess'})
            .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Jess')
})

test("Should not update invalid user fields", async () => {
    await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({location: 'Philadelphia'})
            .expect(400)
})