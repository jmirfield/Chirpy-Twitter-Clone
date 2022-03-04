const express = require('express')
const router = new express.Router()
const multer = require('multer')
const upload = multer()
const userController = require('./userController')
const auth = require('../../middleware/auth')

router.post('/users/new', userController.createNewUser)

router.post('/users/login', userController.login)
router.get('/users/auth', auth, userController.authenticatePersistentLogin)
router.post('/users/logout', auth, userController.logout)
router.post('/users/logoutAll', auth, userController.logoutAll)

router.get('/users/profile/:username', auth, userController.getUserProfile)
router.get('/users/profile/followings/:username', auth, userController.getUserFollowings)
router.get('/users/profile/followers/:username', auth, userController.getUserFollowers)
router.patch('/users/profile/upload/pic', auth, upload.single('image'), userController.uploadPicture)
router.patch('/users/profile/upload/banner', auth, upload.single('image'), userController.uploadBanner)

router.patch('/users/like', auth, userController.likeChirp)
router.patch('/users/unlike', auth, userController.unlikeChirp)

router.delete('/users/delete', auth, userController.deleteUser)

router.get('/users/search/:username', auth, userController.getListOfUsers)



module.exports = router