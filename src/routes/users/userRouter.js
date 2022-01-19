const express = require('express')
const router = new express.Router()
const userController = require('./userController')
const auth = require('../../middleware/auth')

router.post('/users', userController.createNewUser)
router.post('/users/login', userController.login)
router.post('/users/auth', auth, userController.authenticatePersistentLogin)
router.post('/users/logout', auth, userController.logout)
router.post('/users/logoutAll', auth, userController.logoutAll)



module.exports = router