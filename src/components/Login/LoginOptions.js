import React from 'react'
import Button from '../UI/Button/Button'

import classes from './LoginOptions.module.css'

const LoginOptions = (props) => {
    return (
        <div>
            <section>
                <h2>Join Chirpy today.</h2>
                <Button onClick={props.onSignUp}>Sign Up</Button>
            </section>
            <section>
                <p style={{'marginTop': '3rem'}}>Already have an account?</p>
                <Button onClick={props.onSignIn}>Sign In</Button>
            </section>
        </div>
    )
}

export default LoginOptions
