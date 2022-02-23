const express = require('express')
const router = new express.Router()
const multer = require('multer')
const upload = multer()
const controller = require('./chirpController')
const auth = require('../../middleware/auth')

router.post('/chirps', auth, controller.createChirp)
router.post('/chirps/image', auth, upload.any(), controller.createChirpWithImage)
router.post('/chirps/rechirp', auth, controller.addRechirp)
router.delete('/chirps/rechirp/delete', auth, controller.deleteRechirp)
router.get('/chirps/feed', auth, controller.getCurrentUserChirpFeed)
router.get('/chirps/auth/:username', auth, controller.getUserChirps)
router.post('/chirps/liked', auth, controller.getUserLikedChirps)

module.exports = router