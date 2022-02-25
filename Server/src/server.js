const express = require('express')
// const cors = require('cors')
require('./db/connection.js')
const cloudinary = require('cloudinary').v2
const userRouter = require('./routes/users/userRouter')
const chirpRouter = require('./routes/chirps/chirpRouter')
const relationshipRouter = require('./routes/relationships/relationshipRouter')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
// app.use(cors())
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'http://192.168.0.8'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


app.use(userRouter)
app.use(chirpRouter)
app.use(relationshipRouter)

app.listen(PORT, /*'192.168.0.7',*/() => {
    console.log(`Server is listening on port: ${PORT}`)
})

module.exports = app