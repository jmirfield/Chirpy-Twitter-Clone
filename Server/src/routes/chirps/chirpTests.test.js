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

    test('Should delete chirp', async () => {
        await request(app)
            .delete(`/chirps/delete/${mockChirps[0]._id}`)
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(200)
        const chirp = await Chirp.findById(mockChirps[0]._id)
        expect(chirp).toBeNull()
    })

    test('Should fail to delete non-existing chirp', async () => {
        await request(app)
            .delete(`/chirps/delete/fake-id`)
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(404)
    })
})

describe('Chirp feeds', () => {
    test('Should get current user chirp feed', async () => {
        const response = await request(app)
            .get('/chirps/feed/init')
            .set('Authorization', `Bearer ${testUserMain.tokens[0].token}`)
            .expect(200)
        expect(response.body).toHaveProperty('feed')
        expect(response.body?.feed).toHaveLength(10)
    })
})