const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const authRoute = require('./routes/authRoute')
const postRoute = require('./routes/postRoute')
const userRoute = require('./routes/userRoute')
require('dotenv').config()

app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`)
    })
}).catch(err => console.log(err))

app.use('/api', authRoute)
app.use('/api', postRoute)
app.use('/api', userRoute)

