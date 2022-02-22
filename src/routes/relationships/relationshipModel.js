const mongoose = require('mongoose')
const { Schema } = mongoose

const RelationshipSchema = new Schema({
    following_id: {
        type: Schema.ObjectId,
        required: true
    },
    user_id: {
        type: Schema.ObjectId,
        required: true
    }
})

RelationshipSchema.virtual('following', {
    ref: 'User',
    localField: 'following_id',
    foreignField: '_id'
})

RelationshipSchema.virtual('follower', {
    ref: 'User',
    localField: 'user_id',
    foreignField: '_id'
})

RelationshipSchema.index({ user_id: 1, following_id: 1 }, { unique: true })

const Relationship = mongoose.model('Relationship', RelationshipSchema)

module.exports = Relationship