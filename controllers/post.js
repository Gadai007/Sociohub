const { Post } = require('../models/Post')

const createPost = async (req, res) => {
    try {
        const { title, body, photo } = req.body
        if (!title || !body || !photo) {
            return res.status(400).json({ error: 'please type all the fields' })
        }
        req.body.postedBy = req.profile
        const newPost = new Post(req.body)
        const post = await newPost.save()
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(400).json({ error: 'failed o create a post' })
        }
    } catch (error) {
        console.log('error in createPost', error.message)
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('postedBy', '_id name')
        if(posts){
            res.status(200).json(posts)
        }else{
            res.status(400).json({ errors: 'No posts available'})
        }
    } catch (error) {
        console.log('error in getAllPosts', error.message)
    }
}

const getAllUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ postedBy: { _id: req.profile._id}}).populate('postedBy', '_id name')
        if(posts){
            res.status(200).json(posts)
        }else{
            res.status(400).json('failed to get posts of a particular user')
        }
    } catch (error) {
        console.log('error in getAllUserPosts', error.message)
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getAllUserPosts
}