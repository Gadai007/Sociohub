import axios from 'axios'
import * as actions from '../apiActions'

const api = ({ dispatch, getState }) => next => async action => {
    if(action.type !== actions.apiCallBegan.type) return next(action)

    const { url, method, data, onStart, onSuccess, onError } = action.payload

    if(onStart) dispatch({ type: onStart })

    next(action)

    try {
        const response = await axios.request({
            url,
            method,
            data,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${getState().entities.auth.token}`
            }
        })
        dispatch(actions.apiCallSuccess(response.data))
        if(onSuccess) dispatch({ type: onSuccess, payload: response.data})
    } catch (error) {
        dispatch(actions.apiCallFailed(error.message))
        if(onError) dispatch({ type: onError, payload: error.response.data.error})
    }
} 

export default api