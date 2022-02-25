const jwt = require('jsonwebtoken')
const User = require('../routes/users/userModel')

//BEARER TOKEN AUTH
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token })
        if(!user)throw new Error()
        req.token = token
        req.user = user
        next()
    } catch(e) {
        res.status(401).send({error: 'Please authenticate.'})
    }
}
//LOCAL STORAGE AUTH
// const auth = async (req, res, next) => {
//     try {
//         const token = req.body.jwt
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         const user = await User.findOne({_id: decoded._id, 'tokens.token': token })
//         if(!user)throw new Error()
//         req.user = user
//         req.token = token
//         next()
//     } catch(e) {
//         res.status(401).send({error: 'Please authenticate.'})
//     }
// }

module.exports = auth
