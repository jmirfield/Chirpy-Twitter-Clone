const express = require('express')
const router = new express.Router()
const controller = require('./chirpController')
const auth = require('../../middleware/auth')

router.post('/chirps', auth, controller.createChirp)

module.exports = router