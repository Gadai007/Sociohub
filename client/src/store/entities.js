import { combineReducers } from 'redux'
import authReducer from './auth'
import postsReducer from './posts'
import userProfileReducer from './userProfile'

export default combineReducers({
    auth: authReducer,
    posts: postsReducer,
    userProfile: userProfileReducer
})