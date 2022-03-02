const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../routes/users/userModel')
const Relationship = require('../../routes/relationships/relationshipModel')
const Chirp = require('../../routes/chirps/chirpModel')

const testUserId = new mongoose.Types.ObjectId()

const testUser = {
    _id: testUserId,
    username: 'TestUser',
    username_lower: 'testuser',
    email: 'test@test.com',
    password: 'test1234',
    tokens: [{
        token: jwt.sign({ _id: testUserId }, process.env.JWT_SECRET)
    }],
    followerCount: 0,
    followingCount: 0,
    chirpCount: 0
}

const setupDB = async () => {
    await User.deleteMany()
    await Relationship.deleteMany()
    await Chirp.deleteMany()
    await new User(testUser).save()
    await new Relationship({
        following_id: testUserId,
        user_id: testUserId
    }).save()
}

module.exports = {
    testUserId,
    testUser,
    setupDB
}