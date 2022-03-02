const request = require('supertest')
const app = require('../../app')
const User = require('./userModel')
const { testUserId, testUser, setupDB} = require('../../db/fixtures/dbtest')

beforeEach(setupDB)

test('Signs up new user', async() => {
    const response = await request(app)
        .post('/users/new')
        .send({
            username: 'user1',
            email: 'user1@test.com',
            password: 'user1pass'
        })
        .expect(201)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
})