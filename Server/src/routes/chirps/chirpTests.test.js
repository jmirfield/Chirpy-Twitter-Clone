const app = require('../../app')
const mongoose = require('mongoose')
const request = require('supertest')
const Chirp = require('./chirpModel')
const User = require('../users/userModel')
const Relationship = require('../relationships/relationshipModel')
const { dbConnect, dbDisconnect, dbSetup } = require('../../db/fixtures/dbtest')
const { testUserMain, testUserMainId, mockUsers, mockChirps } = require('../../db/fixtures/testData')

beforeAll(dbConnect)

beforeEach(dbSetup)

afterAll(dbDisconnect)

describe('Create and delete chirps', () => {
    test('Should create chirp', async () => {
        const response = await request(app)
            .post('/chirps')
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .send({
                content: 'Test'
            })
            .expect(201)
        expect(response.body).toHaveProperty('content', 'Test')
        const user = await User.findById(testUserMainId)
        expect(user).toHaveProperty('chirpCount', 1)
    })

    test('Should fail to create chirp since nothing was provided', async () => {
        const response = await request(app)
            .post('/chirps')
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(400)
    })
})