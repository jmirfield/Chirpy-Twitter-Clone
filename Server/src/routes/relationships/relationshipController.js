const User = require('../users/userModel')
const Relationship = require('./relationshipModel')

class RelationshipController {
    getRelationships = async (req, res) => {
        try {
            await req.user.populate({
                path: 'following'
            })
            res.status(200).send(req.user.following)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    createRelationship = async (req, res) => {
        try {
            const relationship = new Relationship({
                following_id: req.body._id,
                user_id: req.user._id
            })
            await relationship.save()
            await User.findOneAndUpdate(
                { _id: req.body._id },
                { $inc: { followerCount: 1 } }
            )
            req.user.followingCount++
            await req.user.save()
            res.send()
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }

    deleteRelationship = async (req, res) => {
        try {
            const relationship = await Relationship.findOneAndDelete({
                $and: [
                    { following_id: req.body._id },
                    { user_id: req.user._id }
                ]
            })
            if(!relationship)throw new Error('Could not find that user')
            await User.findOneAndUpdate(
                { _id: req.body._id },
                { $inc: { followerCount: -1 } }
            )
            req.user.followingCount--
            await req.user.save()
            res.send()
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }
}

module.exports = new RelationshipController()