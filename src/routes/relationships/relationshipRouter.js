const express = require('express')
const router = new express.Router()
const RelationshipController = require('./relationshipController')
const auth = require('../../middleware/auth')

router.get('/relationships', auth, RelationshipController.getRelationships)
router.post('/relationships/new', auth, RelationshipController.createRelationship)

module.exports = router