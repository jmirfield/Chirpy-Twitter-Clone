const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../routes/users/userModel')
const Relationship = require('../../routes/relationships/relationshipModel')
const Chirp = require('../../routes/chirps/chirpModel')
const { testUserMain, testUserMainId, mockUsers, mockChirps } = require('./testData')

let mongoServer;

const dbConnect = async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = await mongoServer.getUri()
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    await mongoose.connect(uri, opts, (err) => {
        if (err) console.log(err)
    })
}

const dbDisconnect = async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
}

const dbSetup = async () => {
    await User.deleteMany()
    await Relationship.deleteMany()
    await Chirp.deleteMany()
    await new User(testUserMain).save()
    await new Relationship({
        following_id: testUserMainId,
        user_id: testUserMainId
    }).save()
    await User.insertMany(mockUsers.users)
    await Relationship.insertMany(mockUsers.relationships)
    await Chirp.insertMany(mockChirps)
}


module.exports = {
    dbConnect,
    dbDisconnect,
    dbSetup
}