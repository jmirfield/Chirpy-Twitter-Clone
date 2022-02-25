import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginOptions from './LoginOptions'
import Icon from '../UI/Icon/Icon'
import { LOGO } from '../../constants/icon'
import styles from './Login.module.css'

const Login = () => {
    return (
        <div className={styles['main']}>
            <Icon width="96px" height="96px" fill="rgb(29, 155, 240)" d={LOGO} />
            <h1 className={styles['main__title']}>Ready to Chirp?</h1>
            <LoginOptions className={styles['main__login-options']} />
            {/* MODAL */}
            <Outlet />
        </div>
    )
}

export default Login
