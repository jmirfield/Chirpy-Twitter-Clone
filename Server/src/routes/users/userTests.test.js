const app = require('../../app')
const request = require('supertest')
const User = require('./userModel')
const Relationship = require('../relationships/relationshipModel')
const { dbConnect, dbDisconnect, dbSetup } = require('../../db/fixtures/dbtest')
const { testUserMain, testUserMainId, mockUsers } = require('../../db/fixtures/userTestData')

beforeAll(dbConnect)

beforeEach(dbSetup)

afterAll(dbDisconnect)

describe('Sign up and login', () => {
    test('Should sign up new user', async () => {
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
        const relationship = await Relationship.findOne({ user_id: response.body.user._id, following_id: response.body.user._id })
        expect(relationship).not.toBeNull()
    })

    test('Should fail to sign up new user since username is already taken', async () => {
        await request(app)
            .post('/users/new')
            .send({
                username: testUserMain.username,
                email: 'user1@test.com',
                password: 'user1pass'
            })
            .expect(400)
    })

    test('Should fail to sign up new user since username is is already taken regardless of case', async () => {
        await request(app)
            .post('/users/new')
            .send({
                username: testUserMain.username.toUpperCase(),
                email: testUserMain.email,
                password: 'user1pass'
            })
            .expect(400)
    })

    test('Should fail to sign up new user since email is already taken', async () => {
        await request(app)
            .post('/users/new')
            .send({
                username: 'user1',
                email: testUserMain.email,
                password: 'user1pass'
            })
            .expect(400)
    })

    test('Should login', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                username: testUserMain.username,
                password: testUserMain.password
            })
            .expect(201)
        expect(response.body.username).toBe(testUserMain.username)
    })

    test('Should login regardless of username case', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                username: testUserMain.username.toUpperCase(),
                password: testUserMain.password
            })
            .expect(201)
        expect(response.body.username).toBe(testUserMain.username)
    })

    test('Should fail to login due to no user with that username', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                username: 'test',
                password: testUserMain.password
            })
            .expect(401)
        expect(response.text).toBe('Unable to login')
    })

    test('Should fail to login due to incorrect password', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                username: testUserMain.username,
                password: '12345678'
            })
            .expect(401)
        expect(response.text).toBe('Unable to login')
    })

    test('Should authenticate with Bearer Token', async () => {
        const response = await request(app)
            .get('/users/auth')
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(200)
        expect(response.body.username).toBe(testUserMain.username)
    })

    test('Should fail authenticate due to invalid Bearer Token', async () => {
        await request(app)
            .get('/users/auth')
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}test`)
            .expect(401)
    })

    test('Should logout user', async () => {
        await request(app)
            .post('/users/logout')
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(200)
    })

    test('Should fail to logout user due to no Auth header', async () => {
        await request(app)
            .post('/users/logout')
            .expect(401)
    })
})

describe('User profiles', () => {
    test('Should get current user profile by Bearer token', async () => {
        const response = await request(app)
            .get(`/users/profile/${testUserMain.username}`)
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(200)
        expect(response.body).toHaveProperty('_id', testUserMainId.toString())
        expect(response.body).toHaveProperty('username', testUserMain.username)
        expect(response.body).toHaveProperty('profileImage')
        expect(response.body).toHaveProperty('bannerImage')
        expect(response.body).toHaveProperty('isFollowing')
        expect(response.body).toHaveProperty('followingCount')
        expect(response.body).toHaveProperty('followerCount')
        expect(response.body).toHaveProperty('chirpCount')
        expect(response.body).toHaveProperty('likes')
    })

    test('Should fail to get user profile since no auth', async () => {
        const response = await request(app)
            .get(`/users/profile/${testUserMain.username}`)
            .expect(401)
    })

    test('Should get different user profile', async () => {
        const response = await request(app)
            .get(`/users/profile/${mockUsers.users[0].username}`)
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(200)
        expect(response.body).toHaveProperty('_id', mockUsers.users[0]._id.toString())
        expect(response.body).toHaveProperty('username', mockUsers.users[0].username)
        expect(response.body).toHaveProperty('isFollowing', true)
    })

    test('Should get different user profile but is not following', async () => {
        const last = mockUsers.users.length - 1
        const response = await request(app)
            .get(`/users/profile/${mockUsers.users[last].username}`)
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(200)
        expect(response.body).toHaveProperty('_id', mockUsers.users[last]._id.toString())
        expect(response.body).toHaveProperty('username', mockUsers.users[last].username)
        expect(response.body).toHaveProperty('isFollowing', false)
    })

    test('Should not find user', async () => {
        await request(app)
            .get('/users/profile/fakeuser1234')
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(404)
    })

    test('Should get current user list of followings', async () => {
        const response = await request(app)
            .get(`/users/profile/followings/${testUserMain.username}`)
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(200)
        expect(response.body.length).toBe(mockUsers.users.length - 1)
        for (let i in response.body) expect(response.body[i]._id).toBe(mockUsers.users[i]._id.toString())
    })

    test('Should get current user list of followers', async () => {
        const last = mockUsers.users.length - 1
        const response = await request(app)
            .get(`/users/profile/followers/${testUserMain.username}`)
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0]._id).toBe(mockUsers.users[last]._id.toString())
    })

    test('Should get searched user\'s list of followings', async () => {
        const last = mockUsers.users.length - 1
        const response = await request(app)
            .get(`/users/profile/followings/${mockUsers.users[last].username}`)
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0]._id).toBe(testUserMainId.toString())
    })

    test('Should get searched user\'s list of followers', async () => {
        const response = await request(app)
            .get(`/users/profile/followers/${mockUsers.users[0].username}`)
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0]._id).toBe(testUserMainId.toString())
    })

    test('Should fail to find followings due to user does not exist', async () => {
        await request(app)
            .get('/users/profile/followings/fakeuser1234')
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(404)
    })

    test('Should fail to find followers due to user does not exist', async () => {
        await request(app)
            .get('/users/profile/followings/fakeuser1234')
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(404)
    })
})