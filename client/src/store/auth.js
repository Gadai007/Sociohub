import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from './apiActions'

const slice = createSlice({
    name: 'auth',
    initialState: {
        token: JSON.parse(localStorage.getItem('jwt')),
        user: {},
        error: '',
        redirect: false
    },
    reducers: {
        signup: (auth, action) => {
            auth.user = action.payload
        },
        signupfailed: (auth, action) => {
            auth.error = action.payload
        },
        signin: (auth, action) => {
            localStorage.setItem('jwt', JSON.stringify(action.payload))
            auth.user = action.payload.user
            auth.redirect = true
        },
        signinfailed: (auth, action) => {
            auth.error = action.payload
        },
        signout: (auth, action) => {
            auth.token = localStorage.removeItem('jwt')
            auth.user = {}
            auth.redirect = false
        }
    }
})

export default slice.reducer

export const { signup, signin, signout, signupfailed, signinfailed } = slice.actions

export const userSignUp = ({ name, email, password, pic }) => apiCallBegan({
    url: `/api/signup`,
    method: 'post',
    data: JSON.stringify({ name, email, password, pic }),
    onSuccess: signup.type,
    onError: signupfailed.type
})

export const userSignIn = ({ email, password }) => apiCallBegan({
    url: `/api/signin`,
    method: 'post',
    data: JSON.stringify({ email, password }),
    onSuccess: signin.type,
    onError: signinfailed.type
})

export const userSignout = () => apiCallBegan({
    url: `/api/signout`,
    method: 'get',
    onSuccess: signout.type
})
