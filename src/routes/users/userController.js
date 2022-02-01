const User = require('./userModel')
const Relationship = require('../relationships/relationshipModel')
const Chirp = require('../chirps/chirpModel')
const { response } = require('express')

class UserController {
    createNewUser = async (req, res) => {
        try {
            const user = new User(req.body)
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
            res.status(400).send()
        }
    }

    authenticatePersistentLogin = async (req, res) => {
        try {
            res.status(200).send({ username: req.user.username })
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
    likeChirp = async (req, res) => {
        try {
            req.user.likedChirps.addToSet(req.body._id)
            await req.user.save()
            await Chirp.findOneAndUpdate({ _id: req.body._id }, { $inc: { likesCount: 1 } })
            res.send()
        } catch (e) {
            console.log(e.message)
            res.status(400).send()
        }
    }

    unlikeChirp = async (req, res) => {
        try {
            req.user.likedChirps.pull({ _id: req.body._id })
            await req.user.save()
            await Chirp.findOneAndUpdate({ _id: req.body._id }, { $inc: { likesCount: -1 } })
            res.send()
        } catch (e) {
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