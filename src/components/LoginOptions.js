import React from 'react'
import Button from './UI/Button/Button'

const LoginOptions = () => {
    return (
        <div>
            <section>
                <h2>Join Chirpy today.</h2>
                <Button>Sign Up</Button>
            </section>
            <section>
                <p>Already have an account?</p>
                <Button>Sign In</Button>
            </section>
        </div>
    )
}

export default LoginOptions
