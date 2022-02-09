const mongoose = require('mongoose')
const { Schema } = mongoose

const ChirpSchema = new Schema({
    owner_id: {
        type: Schema.ObjectId,
        required: true
    },
    owner_username: {
        type: String,
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
    rechirp: {
        original_id: {
            type: Schema.ObjectId
        },
        original_owner: {

        },
        original_time: {
            type: String
        }
    }
}, {
    timestamps: true
})

ChirpSchema.methods.toJSON = function () {
    const chirpObj = this.toObject()
    delete chirpObj.ownerId
    delete chirpObj.updatedAt
    delete chirpObj.__v
    return chirpObj
}

const Chirp = mongoose.model('Chirp', ChirpSchema)

module.exports = Chirp