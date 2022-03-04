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

test('TEST', async () => {
    expect(true)
})