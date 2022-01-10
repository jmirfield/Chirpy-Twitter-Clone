import React, { useState } from 'react'
import LoginOptions from '../../components/LoginOptions'
import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'
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

    }

    const closeSignUpModalHandler = () => {
        
    }

    return (
        <div className={classes.loginPage}>
            {signIn && <SignIn />}
            {signUp && <SignUp />}
            <section className={classes.image}></section>
            <section>
                <h1 className={classes.loginTitle}>Time For Some Chirpy</h1>
                <LoginOptions onSignIn={openSignInModalHandler} onSignUp={openSignUpModalHandler}/>
            </section>
        </div>
    )
}

export default Login
