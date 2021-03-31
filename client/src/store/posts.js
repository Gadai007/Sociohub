import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from './apiActions'

const slice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        reload: false,
        myPosts: [],
        post: '',
        loading: false,
        error: ''
    },
    reducers: {
        requestStarted: (posts, action) => {
            posts.loading = true
        },
        addPost: (posts, action) => {
            posts.post = action.payload
            posts.loading = false
        },
        loadPosts: (posts, action) => {
            posts.loading = false
            posts.posts = action.payload
        },
        loadMyPosts: (posts, action) => {
            console.log(action.payload)
            posts.loading = false
            posts.myPosts = action.payload
        },
        likePost: (posts, action) => {
            posts.loading = false
            posts.reload = !posts.reload
        },
        unlikePost: (posts, action) => {
            posts.loading = false
            posts.reload = !posts.reload
        },
        addPostFailed: (posts, action) => {
            posts.loading = false
            posts.error = action.payload
        }
    }
})

export default slice.reducer

const { requestStarted, addPost, addPostFailed, loadPosts, loadMyPosts, likePost, unlikePost} = slice.actions

let id;

if(localStorage.getItem('jwt')){
    id = JSON.parse(localStorage.getItem('jwt')).user.id
}else{
    id = ''
}

// const id = JSON.parse(localStorage.getItem('jwt')).user.id

export const postAdd = ({ title, body, photo }) => apiCallBegan({
    url: `/api/createpost/${id}`,
    method: 'post',
    data: JSON.stringify({ title, body, photo }),
    onStart: requestStarted.type,
    onSuccess: addPost.type,
    onError: addPostFailed.type
})

export const postsLoad = () => apiCallBegan({
    url: `/api/getallposts/${id}`,
    method: 'get',
    onStart: requestStarted.type,
    onSuccess: loadPosts.type,
    onError: addPostFailed.type
})


export const myPostsLoad = () => apiCallBegan({
    url: `/api/getalluserposts/${id}`,
    method: 'get',
    onStart: requestStarted.type,
    onSuccess: loadMyPosts.type,
    onError: addPostFailed.type
})

export const postLiked = (postId) => apiCallBegan({
    url: `/api/postlike/${postId}/${id}`,
    method: 'put',
    onStart: requestStarted.type,
    onSuccess: likePost.type,
    onError: addPostFailed.type
})

export const postUnliked = (postId) => apiCallBegan({
    url: `/api/postunlike/${postId}/${id}`,
    method: 'put',
    onStart: requestStarted.type,
    onSuccess: unlikePost.type,
    onError: addPostFailed.type
})
