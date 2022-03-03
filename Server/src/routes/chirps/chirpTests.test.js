const app = require('../../app')
const request = require('supertest')
const { dbConnect, dbDisconnect, testUserId, testUser, dbSetupDB } = require('../../db/fixtures/dbtest')

beforeAll(dbConnect)

beforeEach(dbSetupDB)

afterAll(dbDisconnect)

test('TEST', async () => {
    expect(true)
})