import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan} from './apiActions'

const slice = createSlice({
    name: 'userProfile',
    initialState: {
        user: {},
        posts: [],
        error: '',
        loading: false
    },
    reducers: {
        requestUser: (user, action) => {
            user.loadUser = true
        },
        loadUser: (user, action) => {
            user.loading = false
            user.user = action.payload.user
            user.posts = action.payload.posts
        },
        errorUser: (user, action) => {
            user.loading = false
            user.error = action.payload.error
        }
    }
})

export default slice.reducer

const { requestUser, loadUser, errorUser } = slice.actions

export const userProfileLoad = (postId) => apiCallBegan({
    url: `/api/profile/${postId}`,
    method: 'get',
    onStart: requestUser.type,
    onSuccess: loadUser.type,
    onError: errorUser.type
})
