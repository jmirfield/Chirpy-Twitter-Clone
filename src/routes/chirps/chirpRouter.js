const express = require('express')
const router = new express.Router()
const controller = require('./chirpController')
const auth = require('../../middleware/auth')

router.post('/chirps', auth, controller.createChirp)
router.get('/chirps/feed', auth, controller.getChirpFeed)

module.exports = router