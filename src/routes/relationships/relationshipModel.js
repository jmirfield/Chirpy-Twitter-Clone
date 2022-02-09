const mongoose = require('mongoose')
const { Schema } = mongoose

const RelationshipSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        required: true
    },
    user_id: {
        type: Schema.ObjectId,
        required: true
    }
})

RelationshipSchema.virtual('chirps', {
    ref: 'Chirp',
    localField: '_id',
    foreignField: 'owner_id'
})

RelationshipSchema.virtual('user', {
    ref: 'User',
    localField: '_id',
    foreignField: '_id'
})

RelationshipSchema.index({ 'user_id': 1, '_id': 1 }, { unique: true })

const Relationship = mongoose.model('Relationship', RelationshipSchema)

module.exports = Relationship