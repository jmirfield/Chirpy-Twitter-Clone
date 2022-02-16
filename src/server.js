const express = require('express')
require('./db/connection.js')
const userRouter = require('./routes/users/userRouter')
const chirpRouter = require('./routes/chirps/chirpRouter')
const relationshipRouter = require('./routes/relationships/relationshipRouter')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "http://192.168.0.7:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

app.use(userRouter)
app.use(chirpRouter)
app.use(relationshipRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})

module.exports = app