const { User } = require('../models/User')

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
        console.log('error in user controller',error)
    }
}

const getUser = (req, res) => {
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    res.status(200).json(req.profile)
}

module.exports = {
    getUserById,
    getUser
}