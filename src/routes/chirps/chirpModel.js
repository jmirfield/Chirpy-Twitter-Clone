const mongoose = require('mongoose')
const { Schema } = mongoose

const ChirpSchema = new Schema({
    ownerId: {
        type: mongoose.ObjectId,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    likesCount: {
        type: Number,
        required: true
    },
    commentsCount: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

const Chirp = mongoose.model('Chirp', ChirpSchema)

module.exports = Chirp