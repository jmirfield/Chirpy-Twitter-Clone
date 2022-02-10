const Chirp = require('./chirpModel')
const User = require('../users/userModel')

class ChirpController {
    createChirp = async (req, res) => {
        try {
            const chirp = new Chirp({
                ...req.body,
                owner_id: req.user._id,
                owner_username: req.user.username,
                rechirpsCount: 0,
                likesCount: 0,
            })
            await chirp.save()
            res.send(chirp)
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }

    getCurrentUserChirpFeed = async (req, res) => {
        try {
            await req.user.populate({
                path: 'following',
                populate: {
                    path: 'user'
                }
            })
            const followQuery = req.user.following.map(user => user.following_id)
            const chirps = await Chirp.find({
                $or: [
                    { 'owner_id': { $in: followQuery } }
                ]
            }, null, {
                sort: { createdAt: -1 },
                lean: true
            })
            res.send({
                feed: chirps,
                likedChirps: req.user.likedChirps,
                retweetedChirps: req.user.retweetedChirps
            })
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }

    addRechirp = async (req, res) => {
        try {
            const chirp = new Chirp({
                ...req.body,
                owner_id: req.user._id,
                owner_username: req.user.username,
            })
            const startingLength = req.user.retweetedChirps.length
            req.user.retweetedChirps.addToSet(chirp.rechirp.original_id)
            if (startingLength !== req.user.retweetedChirps.length) {
                await req.user.save()
                await chirp.save()
                await Chirp.findOneAndUpdate({ _id: chirp.rechirp.original_id }, { $inc: { rechirpsCount: 1 } })
                await Chirp.updateMany({ 'rechirp.original_id': chirp.rechirp.original_id }, { $inc: { rechirpsCount: 1 } })
            }
            res.status(202).send(chirp)
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }

    deleteRechirp = async (req, res) => {
        try {
            if (!req.body._id) throw new Error('Cannot provide null value')
            const startingLength = req.user.retweetedChirps.length
            req.user.retweetedChirps.pull({ _id: req.body._id })
            if (startingLength !== req.user.retweetedChirps.length) {
                await req.user.save()
                await Chirp.findOneAndDelete({
                    $and: [
                        { owner_username: req.user.username },
                        { 'rechirp.original_id': req.body._id }
                    ]
                })
                await Chirp.findOneAndUpdate({ _id: req.body._id }, { $inc: { rechirpsCount: -1 } })
                await Chirp.updateMany({ 'rechirp.original_id': req.body._id }, { $inc: { rechirpsCount: -1 } })
            }
            res.status(202).send()
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }


    getUserChirps = async (req, res) => {
        try {
            const user = await User.findOne({ username: req.params.username })
            await user.populate({
                path: 'chirps'
            })
            user.chirps.sort((a, b) => {
                return b.createdAt - a.createdAt
            })
            res.send({ feed: user.chirps, likedChirps: req.user.likedChirps })
        } catch (e) {
            res.status(404).send()
        }
    }


}

module.exports = new ChirpController()