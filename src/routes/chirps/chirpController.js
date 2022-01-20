const Chirp = require('./chirpModel')

class ChirpController {
    createChirp = async (req, res) => {
        try {
            const chirp = new Chirp({
                ...req.body,
                ownerId: req.user._id,
                likesCount: 0,
                commentsCount: 0
            })
            await chirp.save()
            res.send(chirp)
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }

    getChirpFeed = async (req, res) => {
        try {
            await req.user
                .populate({
                    path: 'relationships',
                    populate: [
                        {
                            path: 'chirps'
                        }, {
                            path: 'users',
                            justOne: true
                        }]
                },
                )
            const feed = []
            req.user.relationships.forEach(user => {
                const userChirps = [...user.chirps].map((chirp) => {
                    const chirpObj = chirp.toObject()
                    delete chirpObj.ownerId
                    delete chirpObj.updatedAt
                    delete chirpObj.__v
                    chirpObj.username = user.users[0].username
                    return chirpObj
                })
                feed.push(...userChirps)
            });
            feed.sort((a, b) => {
                return b.createdAt - a.createdAt
            })
            res.send(feed)
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }

}

module.exports = new ChirpController()