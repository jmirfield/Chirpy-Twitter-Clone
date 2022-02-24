const Chirp = require('./chirpModel')
const User = require('../users/userModel')
const cloudinary = require('cloudinary').v2

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
            req.user.chirpCount++
            await req.user.save()
            res.send(chirp)
        } catch (e) {
            res.status(400).send()
            console.log(e)
        }
    }
    createChirpWithImage = async (req, res) => {
        try {
            const chirp = new Chirp({
                content: req.body.text || '**empty**',
                owner_id: req.user._id,
                owner_username: req.user.username,
                rechirpsCount: 0,
                likesCount: 0,
            })
            cloudinary.uploader.upload_stream({
                public_id: `chirp/${chirp._id}`,
                invalidate: true
            }, async (error, result) => {
                if (error) throw new Error(error)
                chirp.imageURL = result.secure_url
                await chirp.save()
                res.send(chirp)
            }).end(req.files[0].buffer)
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }

    getCurrentUserChirpFeed = async (req, res) => {
        try {
            await req.user.populate({ path: 'following' })
            const followQuery = req.user.following.map(user => user.following_id)
            const chirps = (await Chirp.find({
                'owner_id': { $in: followQuery }
            }, null, {
                sort: { createdAt: -1 },
                lean: true
            }).populate({
                path: 'user',
                select: 'image'
            })).map(chirp => ({ ...chirp, user: chirp.user[0].image }))
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
                const original = await Chirp.findOneAndUpdate(
                    { _id: chirp.rechirp.original_id },
                    { $inc: { rechirpsCount: 1 } }
                )
                chirp.rechirpsCount = original.rechirpsCount
                chirp.likesCount = original.likesCount
                await chirp.save()
                req.user.chirpCount++
                await req.user.save()
                await Chirp.updateMany(
                    { 'rechirp.original_id': chirp.rechirp.original_id },
                    { $inc: { rechirpsCount: 1 } }
                )
            }
            res.status(202).send({ chirp })
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
                const chirp = await Chirp.findOneAndDelete({
                    $and: [
                        { owner_username: req.user.username },
                        { 'rechirp.original_id': req.body._id }
                    ]
                })
                if (!chirp) throw new Error('Could not find chirp')
                await Chirp.findOneAndUpdate(
                    { _id: req.body._id },
                    { $inc: { rechirpsCount: -1 } }
                )
                req.user.chirpCount--
                await req.user.save()
                await Chirp.updateMany(
                    { 'rechirp.original_id': req.body._id },
                    { $inc: { rechirpsCount: -1 } }
                )
            }
            res.status(202).send()
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }


    getUserChirps = async (req, res) => {
        try {
            const chirps = (await Chirp.find({
                'owner_username': req.params.username
            }, null, {
                sort: { createdAt: -1 },
                lean: true
            }).populate({
                path: 'user',
                select: 'image'
            })).map(chirp => ({ ...chirp, user: chirp.user[0].image }))
            res.send({
                feed: chirps,
                likedChirps: req.user.likedChirps,
                retweetedChirps: req.user.retweetedChirps
            })
        } catch (e) {
            console.log(e)
            res.status(404).send()
        }
    }

    getUserLikedChirps = async (req, res) => {
        try {
            const chirps = (await Chirp.find({
                _id: {
                    $in: req.body
                }
            }, null, {
                sort: { createdAt: -1 },
                lean: true
            }).populate({
                path: 'user',
                select: 'image'
            })).map(chirp => ({ ...chirp, user: chirp.user[0].image }))
            res.send({
                feed: chirps,
                likedChirps: req.user.likedChirps,
                retweetedChirps: req.user.retweetedChirps
            })
        } catch (e) {

        }
    }


}

module.exports = new ChirpController()