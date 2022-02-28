const mongoose = require('mongoose')
const { Schema } = mongoose

const ChirpSchema = new Schema({
    owner: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    rechirpsCount: {
        type: Number,
        required: true
    },
    likesCount: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String
    },
    rechirp: {
        type: Schema.ObjectId,
        ref: 'Chirp'
    }
}, {
    timestamps: true
})

ChirpSchema.methods.toJSON = function () {
    const chirpObj = this.toObject()
    delete chirpObj.updatedAt
    delete chirpObj.__v
    return chirpObj
}

ChirpSchema.virtual('user', {
    ref: 'User',
    localField: 'owner_id',
    foreignField: '_id'
})

const Chirp = mongoose.model('Chirp', ChirpSchema)

module.exports = Chirp