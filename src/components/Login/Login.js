import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginOptions from './LoginOptions'
import Icon from '../UI/Icon/Icon'
import { LOGO } from '../../constants/icon'
import classes from './Login.module.css'

const Login = () => {
    return (
        <div className={classes['main']}>
            <Icon width="96px" height="96px" fill="rgb(29, 155, 240)" d={LOGO} />
            <h1 className={classes['main__title']}>Ready to Chirp?</h1>
            <LoginOptions className={classes['main__login-options']} />
            {/* MODAL */}
            <Outlet />
        </div>
    )
}

export default Login
