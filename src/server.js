const express = require('express')
require('./db/connection.js')
const cloudinary = require('cloudinary').v2
const userRouter = require('./routes/users/userRouter')
const chirpRouter = require('./routes/chirps/chirpRouter')
const relationshipRouter = require('./routes/relationships/relationshipRouter')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
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

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})

module.exports = app