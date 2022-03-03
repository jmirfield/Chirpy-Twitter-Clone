const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken')
const User = require('../../routes/users/userModel')
const Relationship = require('../../routes/relationships/relationshipModel')
const Chirp = require('../../routes/chirps/chirpModel')

let mongoServer;

const dbConnect = async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    await mongoose.connect(uri, opts, (err) => {
        if (err) console.log(err)
        console.log('Connected to mongodb memory server')
    })
}

const dbDisconnect = async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
}

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
    dbConnect,
    dbDisconnect,
    testUserId,
    testUser,
    setupDB
}