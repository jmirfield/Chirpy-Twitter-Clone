const { findByIdAndDelete } = require('./chirpModel')
const Chirp = require('./chirpModel')
const cloudinary = require('cloudinary').v2

class ChirpController {
    createChirp = async (req, res) => {
        try {
            const chirp = new Chirp({
                ...req.body,
                owner: req.user._id,
                repliesCount: 0,
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
                repliesCount: 0,
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

    deleteChirp = async (req, res) => {
        try {
            // console.log(req.params.id)
            const chirp = await Chirp.findByIdAndDelete({ _id: req.params.id })
            if (chirp.rechirp) {
                const startingLength = req.user.retweetedChirps.length
                req.user.retweetedChirps.pull({ _id: chirp.rechirp })
                if (startingLength !== req.user.retweetedChirps.length) {
                    await Chirp.findOneAndUpdate(
                        { _id: chirp.rechirp },
                        { $inc: { rechirpsCount: -1 } }
                    )
                    await Chirp.updateMany(
                        { 'rechirp': chirp.rechirp },
                        { $inc: { rechirpsCount: -1 } }
                    )
                }
            } else if (!chirp.rechirp && chirp.reply) {
                await Chirp.findOneAndUpdate(
                    { _id: chirp.reply },
                    { $inc: { repliesCount: -1 } }
                )
                await Chirp.updateMany(
                    { 'rechirp': chirp.reply },
                    { $inc: { repliesCount: -1 } }
                )
            } else if (!chirp.rechirp) {
                await Chirp.deleteMany({
                    $or: [
                        { 'rechirp': req.params.id },
                        { 'reply': req.params.id }
                    ]
                })
            }
            req.user.chirpCount--
            await req.user.save()
            res.send()
        } catch (e) {
            res.status(404).send()
        }
    }

    getCurrentUserChirpFeed = async (req, res) => {
        try {
            await req.user.populate({ path: 'following' })
            const followQuery = req.user.following.map(user => user.following_id)
            const chirps = (await Chirp.find({
                $and: [
                    { 'owner': { $in: followQuery } },
                    {
                        $or: [
                            { 'reply': { '$exists': false } },
                            { 'rechirp': { '$exists': true } }
                        ]
                    }
                ]
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
                    select: ['createdAt', 'repliesCount'],
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
                repliesCount: 0,
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
            if (!req.params.id) throw new Error('Cannot provide null value')
            const startingLength = req.user.retweetedChirps.length
            req.user.retweetedChirps.pull({ _id: req.params.id })
            if (startingLength !== req.user.retweetedChirps.length) {
                const chirp = await Chirp.findOneAndDelete({
                    $and: [
                        { owner: req.user._id },
                        { 'rechirp': req.params.id }
                    ]
                })
                if (!chirp) throw new Error('Could not find chirp')
                await Chirp.findOneAndUpdate(
                    { _id: req.params.id },
                    { $inc: { rechirpsCount: -1 } }
                )
                req.user.chirpCount--
                await req.user.save()
                await Chirp.updateMany(
                    { 'rechirp': req.params.id },
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
                $and: [
                    { 'owner': req.params.userId },
                    {
                        $or: [
                            { 'reply': { '$exists': false } },
                            { 'rechirp': { '$exists': true } }
                        ]
                    }
                ]
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
                    { 'reply': { '$exists': false } },
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

    getChirp = async (req, res) => {
        try {
            const chirp = await Chirp.findOne({ _id: req.params.id })
                .populate({
                    path: 'owner',
                    select: '-_id profileImage username'
                })
            res.send({
                feed: [chirp],
                likedChirps: req.user.likedChirps,
                retweetedChirps: req.user.retweetedChirps
            })
        } catch (e) {
            res.status(404).send()
        }
    }

    addReply = async (req, res) => {
        try {
            const chirp = new Chirp({
                ...req.body,
                owner: req.user._id,
                repliesCount: 0,
                rechirpsCount: 0,
                likesCount: 0,
            })
            await chirp.save()
            await Chirp.findOneAndUpdate(
                { _id: req.body.reply },
                { $inc: { repliesCount: 1 } }
            )
            await Chirp.updateMany(
                { 'rechirp': req.body.reply },
                { $inc: { repliesCount: 1 } }
            )
            res.send(chirp)
        } catch (e) {
            res.status(400).send()
        }
    }

    addReplyWithImage = async (req, res) => {
        try {
            const chirp = new Chirp({
                content: req.body.text || '**empty**',
                reply: req.body.reply,
                owner: req.user._id,
                repliesCount: 0,
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
                await Chirp.findOneAndUpdate(
                    { _id: req.body.reply },
                    { $inc: { repliesCount: 1 } }
                )
                await Chirp.updateMany(
                    { 'rechirp': req.body.reply },
                    { $inc: { repliesCount: 1 } }
                )
                res.send(chirp)
            }).end(req.files[0].buffer)
        } catch (e) {
            res.status(400).send()
        }
    }

    getReplies = async (req, res) => {
        try {
            const chirps = await Chirp.find({
                $and: [
                    { reply: req.params.id },
                    { 'rechirp': { '$exists': false } }
                ]
            }, null, {
                sort: { createdAt: -1 },
                select: '-__v -updatedAt',
                lean: true
            }).populate({
                path: 'owner',
                select: '-_id profileImage username'
            })
            res.send({
                feed: chirps,
                likedChirps: req.user.likedChirps,
                retweetedChirps: req.user.retweetedChirps
            })
        } catch (e) {
            res.status(404).send()
        }
    }

}

module.exports = new ChirpController()