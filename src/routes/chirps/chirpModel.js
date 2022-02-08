const mongoose = require('mongoose')
const { Schema } = mongoose

const ChirpSchema = new Schema({
    owner_id: {
        type: Schema.ObjectId,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    commentsCount: {
        type: Number,
        required: true
    },
    retweetsCount: {
        type: Number,
        required: true
    },
    likesCount: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

ChirpSchema.methods.toJSON = function() {
    const chirpObj = this.toObject()
    delete chirpObj.ownerId
    delete chirpObj.updatedAt
    delete chirpObj.__v
    return chirpObj
}

const Chirp = mongoose.model('Chirp', ChirpSchema)

module.exports = Chirp