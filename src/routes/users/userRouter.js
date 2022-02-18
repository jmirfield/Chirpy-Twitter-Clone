const express = require('express')
const router = new express.Router()
const userController = require('./userController')
const auth = require('../../middleware/auth')

router.post('/users', userController.createNewUser)
router.post('/users/login', userController.login)
router.get('/users/auth', auth, userController.authenticatePersistentLogin)
router.get('/users/profile/:username', auth, userController.getUserProfile)
router.post('/users/logout', auth, userController.logout)
router.post('/users/logoutAll', auth, userController.logoutAll)
router.post('/users/like', auth, userController.likeChirp)
router.delete('/users/unlike', auth, userController.unlikeChirp)
router.delete('/users/delete', auth, userController.deleteUser)



module.exports = router