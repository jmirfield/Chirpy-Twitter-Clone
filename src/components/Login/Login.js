import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoginOptions from './LoginOptions'
import SignIn from './SignIn'
import SignUp from './SignUp'
import classes from './Login.module.css'

const Login = () => {
    const { login } = useParams()
    const navigate = useNavigate()

    const [signInModal, setSignIn] = useState(false)
    const [signUpModal, setSignUp] = useState(false)

    useEffect(() => {
        if(login === 'signin')openSignInModalHandler()
        if(login === 'signup')openSignUpModalHandler()
    }, [])

    const openSignInModalHandler = () => {
        setSignIn(true)
        navigate('/flow/signin')
    }

    const openSignUpModalHandler = () => {
        setSignUp(true)
        navigate('/flow/signup')
    }

    const closeSignInModalHandler = () => {
        setSignIn(false)
        navigate('')
    }

    const closeSignUpModalHandler = () => {
        setSignUp(false)
        navigate('')
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
