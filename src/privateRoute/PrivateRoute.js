import React, { useContext } from 'react'
import { Redirect,Route } from 'react-router';
import {Context} from '../App'

function PrivateRoute(props) {
    let {user} = useContext(Context)
    console.log('user', user)

    if(!user) return <Redirect to="/" />

    return <Route {...props}/>
}

export default PrivateRoute