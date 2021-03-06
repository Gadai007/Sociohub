import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from './apiActions'

const slice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        followingPosts: [],
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
        loadFollowingPost : (posts, action) => {
            posts.loading = false
            posts.followingPosts = action.payload
        },
        loadMyPosts: (posts, action) => {
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
        commentPost: (posts, action) => {
            posts.loading = false
            posts.reload = !posts.reload
        },
        deletePost: (posts, action) => {
            const { _id } = action.payload;
            const index = posts.myPosts.findIndex((post) => post._id === _id);
            posts.myPosts.splice(index, 1);
        },
        addPostFailed: (posts, action) => {
            posts.loading = false
            posts.error = action.payload
        }
    }
})

export default slice.reducer

const { requestStarted, addPost, addPostFailed, loadPosts, loadMyPosts, likePost, unlikePost, commentPost, deletePost, loadFollowingPost } = slice.actions

let id;

if (localStorage.getItem('jwt')) {
    id = JSON.parse(localStorage.getItem('jwt')).user.id
} else {
    id = ''
}


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

export const postsFollowing = () => apiCallBegan({
    url: `/api/getallfollowingposts/${id}`,
    method: 'get',
    onStart: requestStarted.type,
    onSuccess: loadFollowingPost.type,
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

export const postComment = (postId, text) => apiCallBegan({
    url: `/api/postcomment/${postId}/${id}`,
    method: 'put',
    data: JSON.stringify({ text }),
    onStart: requestStarted.type,
    onSuccess: commentPost.type,
    onError: addPostFailed.type
})

export const postDelete = (postId) => apiCallBegan({
    url: `/api/postdelete/${postId}/${id}`,
    method: 'delete',
    onStart: requestStarted.type,
    onSuccess: deletePost.type,
    onError: addPostFailed.type
})
