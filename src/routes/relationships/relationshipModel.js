const mongoose = require('mongoose')
const { Schema } = mongoose

const RelationshipSchema = new Schema({
    following_id: {
        type: Schema.ObjectId,
        required: true,
        index: true
    },
    user_id: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User',
        index: true
    }
})

RelationshipSchema.virtual('chirps', {
    ref: 'Chirp',
    localField: 'following_id',
    foreignField: 'owner_id'
})

RelationshipSchema.virtual('users', {
    ref: 'User',
    localField: 'following_id',
    foreignField: '_id'
})

RelationshipSchema.index({ following_id: 1, user_id: 1 }, { unique: true })

const Relationship = mongoose.model('Relationship', RelationshipSchema)

module.exports = Relationship