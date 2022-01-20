const Relationship = require('./relationshipModel')

class RelationshipController {
    getRelationships = async (req, res) => {
        try {
            await req.user.populate({
                path: 'relationships'
            })
            res.status(200).send(req.user.relationships)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    createRelationship = async (req, res) => {
        const relationship = new Relationship({
            ...req.body,
            user_id: req.user._id
        })
        try {
            await relationship.save()
            res.send()
        } catch(e) {
            res.status(400).send(e)
        }
    }
}

module.exports = new RelationshipController()