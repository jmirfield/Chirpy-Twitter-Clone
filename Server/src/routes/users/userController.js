const User = require('./userModel')
const Relationship = require('../relationships/relationshipModel')
const Chirp = require('../chirps/chirpModel')
const cloudinary = require('cloudinary').v2

class UserController {
    createNewUser = async (req, res) => {
        try {
            const user = new User({
                ...req.body,
                followerCount: 0,
                followingCount: 0,
                chirpCount: 0
            })
            const relationship = new Relationship({
                following_id: user._id,
                user_id: user._id
            })
            const token = await user.generateAuthToken()
            await relationship.save()
            await user.save()
            res.status(201).send({ user, token })
        } catch (e) {
            res.status(400).send(e)
        }
    }

    login = async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.username, req.body.password)
            const token = await user.generateAuthToken()
            await user.save()
            res.status(201).send({ user, token, pic: user.image })
        } catch (e) {
            res.status(400).send()
            console.log(e)
        }
    }

    authenticatePersistentLogin = async (req, res) => {
        try {
            res.status(200).send({ username: req.user.username, pic: req.user.image })
        } catch (e) {
            res.status(404).send()
        }
    }

    logout = async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => req.token !== token.token)
            await req.user.save()
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    }

    logoutAll = async (req, res) => {
        try {
            req.user.tokens = []
            await req.user.save()
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    }
    getUserProfile = async (req, res) => {
        try {
            const user = (req.user.username !== req.params.username)
                ? await User.findOne({ username: req.params.username }).populate({ path: 'following' })
                : req.user
            if (user === null) throw new Error('User not found')
            await req.user.populate({ path: 'following' })
            const isFollowing = req.user.following.some(u => u.following_id.equals(user._id))
            res.send({
                _id: user._id,
                profileImage: user.image || null,
                banner: user.banner || null,
                isFollowing,
                followingCount: user.followingCount,
                followerCount: user.followerCount,
                chirpCount: user.chirpCount,
                likes: user.likedChirps
            })
        } catch (e) {
            console.log(e)
            res.status(404).send()
        }
    }
    getUserFollowings = async (req, res) => {
        try {
            const user = (req.user.username !== req.params.username)
                ? await User.findOne({ username: req.params.username }).populate({ path: 'following' })
                : req.user
            const relationships = await Relationship.find({ user_id: user._id })
                .populate({ path: 'following', select: ['username', 'image'] })
            await req.user.populate({ path: 'following' })
            const followings = relationships.filter(id => {
                if (!id.following[0]) return false
                return !id.following_id.equals(id.user_id)
            }).map(id => {
                const isFollowing = req.user.following.some(u => u.following_id.equals(id.following[0]._id))
                return { username: id.following[0].username, image: id.following[0].image, isFollowing, id: id.following_id }
            })
            res.send(followings)
        } catch (e) {
            console.log(e)
        }
    }

    getUserFollowers = async (req, res) => {
        try {
            const user = (req.user.username !== req.params.username)
                ? await User.findOne({ username: req.params.username }).populate({ path: 'following' })
                : req.user
            const relationships = await Relationship.find({ following_id: user._id })
                .populate({ path: 'follower', select: ['username', 'image'] })
            await req.user.populate({ path: 'following' })
            const followers = relationships.filter(id => {
                if (!id.follower[0]) return false
                return !id.following_id.equals(id.user_id)
            }).map(id => {
                const isFollowing = req.user.following.some(u => u.following_id.equals(id.follower[0]._id))
                return { username: id.follower[0].username, image: id.follower[0].image, isFollowing, id: id.user_id }
            })
            res.send(followers)
        } catch (e) {
            console.log(e)
        }
    }

    likeChirp = async (req, res) => {
        try {
            if (!req.body._id) throw new Error('Cannot provide null value')
            const startingLength = req.user.likedChirps.length
            req.user.likedChirps.addToSet(req.body._id)
            if (startingLength !== req.user.likedChirps.length) {
                await req.user.save()
                await Chirp.findOneAndUpdate(
                    { _id: req.body._id },
                    { $inc: { likesCount: 1 } }
                )
                await Chirp.updateMany(
                    { 'rechirp': req.body._id },
                    { $inc: { likesCount: 1 } }
                )
            }
            res.status(202).send()
        } catch (e) {
            console.log(e.message)
            res.status(400).send()
        }
    }

    unlikeChirp = async (req, res) => {
        try {
            if (!req.body._id) throw new Error('Cannot provide null value')
            const startingLength = req.user.likedChirps.length
            req.user.likedChirps.pull({ _id: req.body._id })
            if (startingLength !== req.user.likedChirps.length) {
                await req.user.save()
                await Chirp.findOneAndUpdate(
                    { _id: req.body._id },
                    { $inc: { likesCount: -1 } }
                )
                await Chirp.updateMany(
                    { 'rechirp': req.body._id },
                    { $inc: { likesCount: -1 } }
                )
            }
            res.status(202).send()
        } catch (e) {
            console.log(e.message)
            res.status(400).send()
        }
    }

    deleteUser = async (req, res) => {
        try {
            await req.user.deleteOne()
            res.send(req.user)
        } catch (e) {
            res.status(500).send()
        }
    }

    uploadPicture = async (req, res) => {
        try {
            cloudinary.uploader.upload_stream({
                public_id: `profile/pic/${req.user._id}`,
                invalidate: true,
                transformation: {
                    crop: 'fill',
                    width: 200,
                    height: 200
                }
            }, async (error, result) => {
                if (error) throw new Error(error)
                req.user.image = result.secure_url
                await req.user.save()
                res.send(result.secure_url)
            }).end(req.file.buffer)
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }

    uploadBanner = async (req, res) => {
        try {
            cloudinary.uploader.upload_stream({
                public_id: `profile/banner/${req.user._id}`,
                invalidate: true,
                transformation: {
                    crop: 'fill',
                    width: 600,
                    height: 200
                }
            }, async (error, result) => {
                if (error) throw new Error(error)
                req.user.banner = result.secure_url
                await req.user.save()
                res.send(result.secure_url)
            }).end(req.file.buffer)
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }

    getListOfUsers = async (req, res) => {
        try {
            await req.user.populate({ path: 'following' })
            const users = (await User.find({
                $and:
                    [
                        { 'username': { '$regex': new RegExp(req.params.username, 'i') } },
                        { 'username': { '$ne': req.user.username } }
                    ]
            }, null, {
                limit: 5,
                lean: true
            }).select(['username', 'image'])).map(user => {
                const isFollowing = req.user.following.some(u => u.following_id.equals(user._id))
                return { username: user.username, image: user.image, isFollowing, id: user._id }
            })
            res.send(users)
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }
}

module.exports = new UserController()