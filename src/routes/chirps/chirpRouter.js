const express = require('express')
const router = new express.Router()
const controller = require('./chirpController')
const auth = require('../../middleware/auth')

router.post('/chirps', auth, controller.createChirp)
router.get('/chirps/feed', auth, controller.getCurrentUserChirpFeed)
router.get('/chirps/auth/:username', auth, controller.getUserChirps)
router.get('/chirps/test', auth, controller.test)

module.exports = router