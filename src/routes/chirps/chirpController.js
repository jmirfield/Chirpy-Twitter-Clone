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
        } catch(e) {
            console.log(e)
            res.status(400).send()
        }
    }

}

module.exports = new ChirpController()