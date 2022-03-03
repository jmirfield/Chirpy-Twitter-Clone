const app = require('../../app')
const request = require('supertest')
const { dbConnect, dbDisconnect, testUserId, testUser, setupDB } = require('../../db/fixtures/dbtest')

beforeAll(dbConnect)

beforeEach(setupDB)

afterAll(dbDisconnect)

test('TEST', async () => [
    expect(true)
])