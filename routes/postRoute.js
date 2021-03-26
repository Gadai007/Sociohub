const route = require('express').Router()
const { isSignin, isAuthenticated } = require('../controllers/auth')
const { createPost, getAllPosts, getAllUserPosts } = require('../controllers/post')
const { getUserById } = require('../controllers/user')

route.param('id', getUserById)


route.get('/getallposts/:id', isSignin, isAuthenticated, getAllPosts)
route.get('/getalluserposts/:id', isSignin, isAuthenticated, getAllUserPosts)
route.post('/createpost/:id', isSignin, isAuthenticated, createPost)

module.exports = route