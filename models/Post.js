const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: 'user'
    }],
    comments: [{
        text: String,
        postedBy: {
            type: ObjectId,
            ref: 'user'
        }
    }],
    postedBy: {
        type: ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

const Post = mongoose.model('post', postSchema)

module.exports = { Post }