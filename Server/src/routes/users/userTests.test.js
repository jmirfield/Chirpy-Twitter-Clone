const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../app')
const User = require('./userModel')
const Relationship = require('../relationships/relationshipModel')
const { testUserId, testUser, setupDB } = require('../../db/fixtures/dbtest')


beforeEach(setupDB)

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
            username: testUser.username,
            email: 'user1@test.com',
            password: 'user1pass'
        })
        .expect(400)
})

test('Should fail to sign up new user since username is is already taken regardless of case', async () => {
    await request(app)
        .post('/users/new')
        .send({
            username: testUser.username.toUpperCase(),
            email: testUser.email,
            password: 'user1pass'
        })
        .expect(400)
})

test('Should fail to sign up new user since email is already taken', async () => {
    await request(app)
        .post('/users/new')
        .send({
            username: 'user1',
            email: testUser.email,
            password: 'user1pass'
        })
        .expect(400)
})

test('Should login', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            username: testUser.username,
            password: testUser.password
        })
        .expect(201)
    expect(response.body.username).toBe(testUser.username)
})

test('Should login regardless of username case', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            username: testUser.username.toUpperCase(),
            password: testUser.password
        })
        .expect(201)
    expect(response.body.username).toBe(testUser.username)
})

test('Should fail to login due to no user with that username', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            username: 'test',
            password: testUser.password
        })
        .expect(401)
    expect(response.text).toBe('Unable to login')
})

test('Should fail to login due to incorrect password', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            username: testUser.username,
            password: '12345678'
        })
        .expect(401)
    expect(response.text).toBe('Unable to login')
})

test('Should authenticate with Bearer Token', async () => {
    const response = await request(app)
        .get('/users/auth')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .expect(200)
    expect(response.body.username).toBe(testUser.username)
})

test('Should fail authenticate due to invalid Bearer Token', async () => {
    await request(app)
        .get('/users/auth')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}123`)
        .expect(401)
})

