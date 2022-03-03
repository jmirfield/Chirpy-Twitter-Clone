const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const testUserMainId = new mongoose.Types.ObjectId()

const testUserMain = {
    _id: testUserMainId,
    username: 'TestUser',
    username_lower: 'testuser',
    email: 'test@test.com',
    password: 'test1234',
    tokens: [{
        token: jwt.sign({ _id: testUserMainId }, process.env.JWT_SECRET)
    }],
    followerCount: 0,
    followingCount: 0,
    chirpCount: 0
}

const createMockUsers = (n) => {
    let users = []
    let relationships = []
    for (let i = 0; i < n; i++) {
        const _id = new mongoose.Types.ObjectId()
        users.push({
            _id: _id,
            username: `User${i}test`,
            username_lower: `user${i}test`,
            email: `User${i}test@test.com`,
            password: `test12345${i}`,
            tokens: [{
                token: jwt.sign({ _id: _id }, process.env.JWT_SECRET)
            }],
            followerCount: 0,
            followingCount: 0,
            chirpCount: 0
        })
        if (n-1 !== i) {
            relationships.push({
                user_id: testUserMainId,
                following_id: _id
            })
        }
    }
    return { users, relationships }
}

module.exports = {
    testUserMainId,
    testUserMain,
    mockUsers: createMockUsers(5)
}