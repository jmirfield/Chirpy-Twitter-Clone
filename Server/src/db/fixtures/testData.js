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
    const users = []
    const relationships = []

    for (let i = 0; i < n; i++) {
        const _id = new mongoose.Types.ObjectId()
        users.push({
            _id,
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
        //Main test user follows everyone except last mockUser
        //Last mockUser only follows main user
        if (n - 1 !== i) {
            relationships.push({
                user_id: testUserMainId,
                following_id: _id
            })
        } else {
            relationships.push({
                user_id: _id,
                following_id: testUserMainId
            })
        }
    }
    return { users, relationships }
}

const mockUsers = createMockUsers(5)

const createMockChirps = (users, n) => {
    const chirps = []
    for(let i in users) {
        for(let t=0; t<n; t ++){
            const _id = new mongoose.Types.ObjectId()
            chirps.push({
                _id,
                owner: users[i]._id,
                content: `posted by user ${i} chirp number ${t}`,
                rechirpsCount: 0, 
                likesCount: 0
            })
        }
    }
    return chirps
}

module.exports = {
    testUserMainId,
    testUserMain,
    mockUsers,
    mockChirps: createMockChirps(mockUsers.users, 3)
}