const request = require('supertest')
const app = require('../src/app')

test('should sign up a new user', async () => {
    await request(app).post('/users').send({ 
        name: 'Sandro',
        email: 'eagboka@otr.tg',
        password: 'azerty123'
    }).expect(201)
})