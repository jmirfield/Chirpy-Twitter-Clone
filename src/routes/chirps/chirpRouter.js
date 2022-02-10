const express = require('express')
const router = new express.Router()
const controller = require('./chirpController')
const auth = require('../../middleware/auth')

router.post('/chirps', auth, controller.createChirp)
router.post('/chirps/rechirp', auth, controller.addRechirp)
router.delete('/chirps/rechirp/delete', auth, controller.deleteRechirp)
router.get('/chirps/feed', auth, controller.getCurrentUserChirpFeed)
router.get('/chirps/auth/:username', auth, controller.getUserChirps)

module.exports = router