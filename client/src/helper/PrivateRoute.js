import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoutes = ({ component: Component, ...rest }) => {
    const token = useSelector(state => state.entities.auth.token)
    return (
        <Route
            {...rest}
            render={props => token ? (
                <Component {...props} />
            )
                : (
                    <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
                )}
        />
    )
}

export default PrivateRoutes
