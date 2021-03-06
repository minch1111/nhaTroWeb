import React, { useContext } from 'react'
// import { Route } from 'react-router';
import { Redirect,Route } from 'react-router-dom';
import {Context} from '../App'
// import {Navigate} from 'react-router-dom'

function PrivateRoute(props) {
    let {user} = useContext(Context)
    // console.log('user', user)

    if(!user) {
        // alert("Bạn phải đăng nhập");
        return <Redirect to="/" />
    }

    return <Route {...props}/>
}

export default PrivateRoute