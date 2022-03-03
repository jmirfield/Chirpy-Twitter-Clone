const app = require('../../app')
const request = require('supertest')
const { dbConnect, dbDisconnect, testUserId, testUser, dbSetup } = require('../../db/fixtures/dbtest')

beforeAll(dbConnect)

beforeEach(dbSetup)

afterAll(dbDisconnect)

test('TEST', async () => {
    expect(true)
})