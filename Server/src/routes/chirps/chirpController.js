const Chirp = require('./chirpModel')
const cloudinary = require('cloudinary').v2

class ChirpController {
    createChirp = async (req, res) => {
        try {
            const chirp = new Chirp({
                ...req.body,
                owner: req.user._id,
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
                owner: req.user._id,
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
                req.user.chirpCount++
                await req.user.save()
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
                'owner': { $in: followQuery }
            }, null, {
                sort: { createdAt: -1 },
                select: '-__v -updatedAt',
                lean: true
            }).populate([
                {
                    path: 'owner',
                    select: '-_id profileImage username'
                },
                {
                    path: 'rechirp',
                    select: ['createdAt'],
                    populate: {
                        path: 'owner',
                        select: '-_id profileImage username'
                    }
                }
            ]))
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
                owner: req.user._id,
            })
            const startingLength = req.user.retweetedChirps.length
            req.user.retweetedChirps.addToSet(chirp.rechirp)
            if (startingLength !== req.user.retweetedChirps.length) {
                const original = await Chirp.findOneAndUpdate(
                    { _id: chirp.rechirp },
                    { $inc: { rechirpsCount: 1 } }
                )
                chirp.rechirpsCount = original.rechirpsCount
                chirp.likesCount = original.likesCount
                await chirp.save()
                req.user.chirpCount++
                await req.user.save()
                await Chirp.updateMany(
                    { 'rechirp': chirp.rechirp },
                    { $inc: { rechirpsCount: 1 } }
                )
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
                const chirp = await Chirp.findOneAndDelete({
                    $and: [
                        { owner: req.user._id },
                        { 'rechirp': req.body._id }
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
                    { 'rechirp': req.body._id },
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
            const chirps = await Chirp.find({
                'owner': req.params.userId
            }, null, {
                sort: { createdAt: -1 },
                select: '-__v -updatedAt',
                lean: true
            }).populate({
                path: 'rechirp',
                select: ['createdAt'],
                populate: {
                    path: 'owner',
                    select: '-_id profileImage username'
                }
            })
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

    getUserMedia = async (req, res) => {
        try {
            const chirps = await Chirp.find({
                $and: [
                    { 'owner': req.params.userId },
                    { 'rechirp': { '$exists': false } },
                    { 'imageURL': { '$ne': '' }, }
                ]
            }, null, {
                sort: { createdAt: -1 },
                select: '-__v -updatedAt',
                lean: true
            })
            res.send({
                feed: chirps,
                likedChirps: req.user.likedChirps,
                retweetedChirps: req.user.retweetedChirps
            })
        } catch (e) {
            res.status(400).send()
        }
    }

    getUserLikedChirps = async (req, res) => {
        try {
            const chirps = await Chirp.find({
                _id: {
                    $in: req.body
                }
            }, null, {
                sort: { createdAt: -1 },
                select: '-__v -updatedAt',
                lean: true
            }).populate({
                path: 'owner',
                select: 'profileImage username -_id'
            })
            res.send({
                feed: chirps,
                likedChirps: req.user.likedChirps,
                retweetedChirps: req.user.retweetedChirps
            })
        } catch (e) {
            res.status(400).send()
        }
    }


}

module.exports = new ChirpController()