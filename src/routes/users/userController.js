const User = require('./userModel')
const Relationship = require('../relationships/relationshipModel')
const Chirp = require('../chirps/chirpModel')

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
            res.status(201).send({ user, token })
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }

    authenticatePersistentLogin = async (req, res) => {
        try {
            res.status(200).send({ username: req.user.username, id: req.user._id })
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
                id: user._id,
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
                .populate('following')
            const followings = relationships.filter(id => {
                if (!id.following[0]) return false
                return !id.following_id.equals(id.user_id)
            }).map(id => id.following[0].username)
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
                .populate('follower')
            const followers = relationships.filter(id => {
                if (!id.follower[0]) return false
                return !id.following_id.equals(id.user_id)
            }).map(id => id.follower[0].username)
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
                    { 'rechirp.original_id': req.body._id },
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
                    { 'rechirp.original_id': req.body._id },
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
            res.status(500).send(e)
        }
    }
}

module.exports = new UserController()