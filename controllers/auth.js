const { User } = require('../models/User')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.mySecret, { expiresIn: 3 * 24 * 60 * 60 })
}

const signup = async (req, res) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }

    const { email } = req.body
    const user = await User.findOne({ email })
    if (user) {
        res.status(400).json({ error: 'user already exists ' })
    } else {
        const newUser = new User(req.body)
        const saveUser = await newUser.save()
        if (saveUser) {
            res.status(200).json(saveUser)
        } else {
            res.status(400).json({
                error: 'failed to save the user'
            })
        }
    }
}


const signin = async (req, res) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    const { email, password } = req.body
    const user = await User.authenticate(email, password)
    if (user) {
        const token = createToken(user._id)
        res.cookie('token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } else {
        res.status(400).json({
            error: 'please check your email or password'
        })
    }
}

const signout = (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ message: 'signout successfull' })
}

const isSignin = (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        jwt.verify(token, process.env.mySecret, async function (err, decodedToken) {
            if (err) {
                return res.status(400).json({ error: 'unauthorized token' })
            }
            req.auth = decodedToken
            next()
        })
    } else {
        res.status(401).json({ error: 'token not found' })
    }
}

const isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth.id
    if (!checker) {
        return res.status(401).json({ error: 'Access denied ' })
    }
    next()
}

module.exports = {
    signup,
    signin,
    signout,
    isSignin,
    isAuthenticated
}
