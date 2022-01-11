import React, { useState } from 'react'
import LoginOptions from '../../components/Login/LoginOptions'
import SignIn from '../../components/Login/SignIn'
import SignUp from '../../components/Login/SignUp'
import classes from './Login.module.css'

const Login = () => {
    const [signInModal, setSignIn] = useState(false)
    const [signUpModal, setSignUp] = useState(false)

    const openSignInModalHandler = () => {
        setSignIn(true)
    }

    const openSignUpModalHandler = () => {
        setSignUp(true)
    }

    const closeSignInModalHandler = () => {
        setSignIn(false)
    }

    const closeSignUpModalHandler = () => {
        setSignUp(false)
    }

    return (
        <div className={classes.loginPage}>
            {signInModal && <SignIn onClose={closeSignInModalHandler}/>}
            {signUpModal && <SignUp onClose={closeSignUpModalHandler}/>}
            <div className={classes.image}></div>
            <div className={classes.loginSide}>
                <h1 className={classes.loginTitle}>Time For Some Chirpy</h1>
                <LoginOptions onSignIn={openSignInModalHandler} onSignUp={openSignUpModalHandler}/>
            </div>
        </div>
    )
}

export default Login
