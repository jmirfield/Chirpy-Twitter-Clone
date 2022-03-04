const User = require('./userModel')
const Relationship = require('../relationships/relationshipModel')
const Chirp = require('../chirps/chirpModel')
const cloudinary = require('cloudinary').v2

class UserController {
    createNewUser = async (req, res) => {
        try {
            const user = new User({
                ...req.body,
                username_lower: req.body.username,
                followerCount: 0,
                followingCount: 0,
                chirpCount: 0
            })
            const relationship = new Relationship({
                following_id: user._id,
                user_id: user._id
            })
            const token = await user.generateAuthToken()
            await user.save().catch((err) => { throw new Error(err) })
            await relationship.save()
            res.status(201).send({ user, token })
        } catch (e) {
            res.status(400).send()
        }
    }

    login = async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.username, req.body.password)
            const token = await user.generateAuthToken()
            await user.save()
            res.status(201).send({ username: user.username, token, profileImage: user.profileImage })
        } catch (e) {
            res.status(401).send(e.message)
        }
    }

    authenticatePersistentLogin = async (req, res) => {
        try {
            res.status(200).send({ username: req.user.username, profileImage: req.user.profileImage })
        } catch (e) {
            res.status(400).send()
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
            const user = (req.user.username.toLowerCase() !== req.params.username.toLowerCase())
                ? await User.findOne({ username_lower: req.params.username.toLowerCase() }).populate({ path: 'following' })
                : req.user
            if (user === null) throw new Error('User not found')
            await req.user.populate({ path: 'following' })
            const isFollowing = req.user.following.some(u => u.following_id.equals(user._id))
            res.send({
                _id: user._id,
                username: user.username,
                profileImage: user.profileImage || null,
                bannerImage: user.bannerImage || null,
                isFollowing,
                followingCount: user.followingCount,
                followerCount: user.followerCount,
                chirpCount: user.chirpCount,
                likes: user.likedChirps
            })
        } catch (e) {
            res.status(404).send()
        }
    }
    getUserFollowings = async (req, res) => {
        try {
            const user = (req.user.username.toLowerCase() !== req.params.username.toLowerCase())
                ? await User.findOne({ username_lower: req.params.username.toLowerCase() }).populate({ path: 'following' })
                : req.user
            if (user === null) throw new Error('User not found')
            const relationships = await Relationship.find({ user_id: user._id })
                .populate({ path: 'following', select: ['username', 'profileImage'] })
            await req.user.populate({ path: 'following' })
            const followings = relationships.filter(id => {
                if (!id.following[0]) return false
                return !id.following_id.equals(id.user_id)
            }).map(id => {
                const isFollowing = req.user.following.some(u => u.following_id.equals(id.following[0]._id))
                return { username: id.following[0].username, profileImage: id.following[0].profileImage, isFollowing, _id: id.following_id }
            })
            res.send(followings)
        } catch (e) {
            res.status(404).send()
        }
    }

    getUserFollowers = async (req, res) => {
        try {
            const user = (req.user.username.toLowerCase() !== req.params.username.toLowerCase())
                ? await User.findOne({ username_lower: req.params.username.toLowerCase() }).populate({ path: 'following' })
                : req.user
            if (user === null) throw new Error('User not found')
            const relationships = await Relationship.find({ following_id: user._id })
                .populate({ path: 'follower', select: ['username', 'profileImage'] })
            await req.user.populate({ path: 'following' })
            const followers = relationships.filter(id => {
                if (!id.follower[0]) return false
                return !id.following_id.equals(id.user_id)
            }).map(id => {
                const isFollowing = req.user.following.some(u => u.following_id.equals(id.follower[0]._id))
                return { username: id.follower[0].username, profileImage: id.follower[0].profileImage, isFollowing, _id: id.user_id }
            })
            res.send(followers)
        } catch (e) {
            res.status(404).send()
        }
    }

    likeChirp = async (req, res) => {
        try {
            if (!req.body._id) throw new Error('Cannot provide null value')
            const startingLength = req.user.likedChirps.length
            req.user.likedChirps.addToSet(req.body._id)
            if (startingLength !== req.user.likedChirps.length) {
                const chirp = await Chirp.findOneAndUpdate(
                    { _id: req.body._id },
                    { $inc: { likesCount: 1 } }
                )
                if(!chirp)throw new Error('Chirp not found')
                await Chirp.updateMany(
                    { 'rechirp': req.body._id },
                    { $inc: { likesCount: 1 } }
                )
                await req.user.save()
            }
            res.status(202).send()
        } catch (e) {
            res.status(404).send()
        }
    }

    unlikeChirp = async (req, res) => {
        try {
            if (!req.body._id) throw new Error('Cannot provide null value')
            const startingLength = req.user.likedChirps.length
            req.user.likedChirps.pull({ _id: req.body._id })
            if (startingLength !== req.user.likedChirps.length) {
                const chirp = await Chirp.findOneAndUpdate(
                    { _id: req.body._id },
                    { $inc: { likesCount: -1 } }
                )
                await Chirp.updateMany(
                    { 'rechirp': req.body._id },
                    { $inc: { likesCount: -1 } }
                )
                await req.user.save()
            }
            res.status(202).send()
        } catch (e) {
            res.status(404).send()
        }
    }

    deleteUser = async (req, res) => {
        try {
            await req.user.deleteOne()
            res.status(204).send()
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
                req.user.profileImage = result.secure_url
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
                req.user.bannerImage = result.secure_url
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
                        { username_lower: { '$regex': new RegExp(req.params.username.toLowerCase(), 'i') } },
                        { 'username': { '$ne': req.user.username } }
                    ]
            }, null, {
                limit: 10,
                lean: true
            }).select(['username', 'profileImage'])).map(user => {
                const isFollowing = req.user.following.some(u => u.following_id.equals(user._id))
                return { username: user.username, profileImage: user.profileImage || '', isFollowing, _id: user._id }
            })
            res.send(users)
        } catch (e) {
            res.status(400).send()
        }
    }
}

module.exports = new UserController()