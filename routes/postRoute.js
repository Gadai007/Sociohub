const route = require('express').Router()
const { isSignin, isAuthenticated } = require('../controllers/auth')
const { getPostById, createPost, getAllPosts, getAllUserPosts, postLike, postUnlike, postComment } = require('../controllers/post')
const { getUserById } = require('../controllers/user')

route.param('id', getUserById)
route.param('postId', getPostById)


route.get('/getallposts/:id', isSignin, isAuthenticated, getAllPosts)
route.get('/getalluserposts/:id', isSignin, isAuthenticated, getAllUserPosts)
route.post('/createpost/:id', isSignin, isAuthenticated, createPost)
route.put('/postlike/:postId/:id', isSignin, isAuthenticated, postLike)
route.put('/postunlike/:postId/:id', isSignin, isAuthenticated, postUnlike)
route.put('/postcomment/:postId/:id', isSignin, isAuthenticated, postComment)

module.exports = route