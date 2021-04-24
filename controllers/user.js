const { User } = require('../models/User')
const { Post } = require('../models/Post')

const getUserById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id).select('-password')
        if (user) {
            req.profile = user
            next()
        } else {
            res.status(400).json({ error: 'user not found' })
        }
    } catch (error) {
        console.log('error in user controller', error)
    }
}

const getUser = (req, res) => {
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    res.status(200).json(req.profile)
}

const getAUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.profileId).select('-password')
        if (user) {
            const posts = await Post.find({ postedBy: req.params.profileId }).populate('postedBy', '_id name')
            if (posts) {
                res.status(200).json({ user, posts })
            } else {
                res.status(400).json({ error: 'posts are not found of the particular user' })
            }
        } else {
            res.status(400).json({ error: 'requested user not found' })
        }
    } catch (error) {
        console.log('error on getAUser controller', error.message)
    }
}

const followUser = async (req, res) => {
    try {
        const followUser = await User.findByIdAndUpdate(req.params.profileId, { $push: { followers: req.profile._id } }, { new: true, useFindAndModify: false }).select('-password')
        if (followUser) {
            const followingUser = await User.findByIdAndUpdate(req.profile._id, { $push: { following: req.params.profileId } }, { new: true , useFindAndModify: false})
            if(followingUser){
                res.status(200).json(followUser)
            }else{
                res.status(400).json({ error: 'failed to following a user'})
            }
        } else {
            res.status(400).json({ error: 'failed to follow a user' })
        }
    } catch (error) {
        console.log('error in followUser Controller', error.message)
    }
}


const unFollowUser = async (req, res) => {
    try {
        const followUser = await User.findByIdAndUpdate(req.params.profileId, { $pull: { followers: req.profile._id } }, { new: true }).select('-password')
        if (followUser) {
            const followingUser = await User.findByIdAndUpdate(req.profile._id, { $pull: { following: req.params.profileId } }, { new: true })
            if(followingUser){
                res.status(200).json(followUser)
            }else{
                res.status(400).json({ error: 'failed to following a user'})
            }
        } else {
            res.status(400).json({ error: 'failed to follow a user' })
        }
    } catch (error) {
        console.log('error in followUser Controller', error.message)
    }
}

module.exports = {
    getUserById,
    getUser,
    getAUser,
    followUser,
    unFollowUser
}