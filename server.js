const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
const authRoute = require('./routes/authRoute')
const postRoute = require('./routes/postRoute')
const userRoute = require('./routes/userRoute')
const PORT = process.env.PORT || 5000
require('dotenv').config()


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`)
    })
}).catch(err => console.log(err))


app.use('/api', authRoute)
app.use('/api', postRoute)
app.use('/api', userRoute)

if (process.env.NODE_ENV === 'production') {
    // app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
      });
}

