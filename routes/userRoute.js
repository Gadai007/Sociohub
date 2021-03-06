const route = require('express').Router()
const { isSignin, isAuthenticated } = require('../controllers/auth')
const { getUserById, getUser, getAUser, followUser, unFollowUser, searchUser} = require('../controllers/user')

route.param('id', getUserById)

route.get('/user/:id', isSignin, isAuthenticated, getUser)
route.get('/profile/:profileId', isSignin, getAUser)
route.put('/follow/:profileId/:id', isSignin, followUser)
route.put('/unfollow/:profileId/:id', isSignin, unFollowUser)
route.post('/search-user', isSignin, searchUser)

module.exports = route