import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan} from './apiActions'

const slice = createSlice({
    name: 'userProfile',
    initialState: {
        user: {},
        posts: [],
        followers: [],
        following: [],
        error: '',
        loading: false,
        reload: false
    },
    reducers: {
        requestUser: (user, action) => {
            user.loading = true
        },
        loadUser: (user, action) => {
            user.loading = false
            user.user = action.payload.user
            user.followers = action.payload.user.followers
            user.following = action.payload.user.following
            user.posts = action.payload.posts
        },
        errorUser: (user, action) => {
            user.loading = false
            user.error = action.payload.error
        },
        followUser: (user, action) => {
            user.loading = false
            user.followers = action.payload.followers
            user.following = action.payload.following
            user.reload = !user.reload
        }
    }
})

export default slice.reducer

const { requestUser, loadUser, errorUser, followUser } = slice.actions

let id;

if (localStorage.getItem('jwt')) {
    id = JSON.parse(localStorage.getItem('jwt')).user.id
} else {
    id = ''
}

export const userProfileLoad = (postId) => apiCallBegan({
    url: `/api/profile/${postId}`,
    method: 'get',
    onStart: requestUser.type,
    onSuccess: loadUser.type,
    onError: errorUser.type
})

export const userFollow = (postId) => apiCallBegan({
    url: `/api/follow/${postId}/${id}`,
    method: 'put',
    onStart: requestUser.type,
    onSuccess: followUser.type,
    onError: errorUser.type
})

export const userUnfollow = (postId) => apiCallBegan({
    url: `/api/unfollow/${postId}/${id}`,
    method: 'put',
    onStart: requestUser.type,
    onSuccess: followUser.type,
    onError: errorUser.type
})
