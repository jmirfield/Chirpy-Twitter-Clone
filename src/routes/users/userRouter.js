const express = require('express')
const router = new express.Router()
const userController = require('./userController')
const auth = require('../../middleware/auth')

router.post('/users', userController.createNewUser)
router.post('/users/login', userController.login)
router.get('/users/auth', auth, userController.authenticatePersistentLogin)
router.get('/users/logout', auth, userController.logout)
router.get('/users/logoutAll', auth, userController.logoutAll)
router.post('/users/like', auth, userController.likeChirp)
router.post('/users/unlike', auth, userController.unlikeChirp)
router.delete('/users/delete', auth, userController.deleteUser)



module.exports = router