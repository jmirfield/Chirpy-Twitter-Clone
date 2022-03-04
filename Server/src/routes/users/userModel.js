const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Relationship = require('../relationships/relationshipModel')
const Chirp = require('../chirps/chirpModel')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 4,
        maxlength: 25
    },
    username_lower: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: 5,
        maxlength: 64
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    profileImage: {
        type: String
    },
    bannerImage: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    likedChirps: [{
        type: Schema.ObjectId
    }],
    retweetedChirps: [{
        type: Schema.ObjectId
    }],
    followerCount: {
        type: Number,
        required: true
    },
    followingCount: {
        type: Number,
        required: true
    },
    chirpCount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

UserSchema.virtual('following', {
    ref: 'Relationship',
    localField: '_id',
    foreignField: 'user_id'
})


//Checks for login using email and password
UserSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username_lower: username.toLowerCase() })
    if (!user) throw new Error('Unable to login')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Unable to login')
    return user
}

//Generates login JWT token
UserSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET)
    this.tokens = this.tokens.concat({ token })
    return token
}

//Deletes sensitive information before being sent back as response
UserSchema.methods.toJSON = function () {
    const userObj = this.toObject()
    delete userObj.password
    delete userObj.tokens
    delete userObj.createdAt
    delete userObj.updatedAt
    delete userObj.email
    delete userObj.__v
    return userObj
}


//Hashes password before being saved to DB
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

//Deletes all Relationships and Chirps if User is removed
UserSchema.pre('deleteOne', { document: true }, async function (next) {
    await Relationship.deleteMany({ user_id: this._id })
    await Relationship.deleteMany({ following_id: this._id })
    await Chirp.deleteMany({ owner_id: this._id })
    next()
})


const User = mongoose.model('User', UserSchema)

module.exports = User