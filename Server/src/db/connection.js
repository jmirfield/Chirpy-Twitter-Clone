const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) return console.log(err)
        console.log('Connected to DB')
    })
}
