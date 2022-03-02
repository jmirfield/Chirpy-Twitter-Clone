import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../UI/Button/Button'
import styles from './styles.module.css'

const LoginOptions = ({ className }) => {
    const navigate = useNavigate()

    const openSignUpModalHandler = () => {
        navigate('/flow/signup')
    }

    const openSignInModalHandler = () => {
        navigate('/flow/signin')
    }

    return (
        <section className={`${className} ${styles.options}`}>
            <h2>Join Chirpy today.</h2>
            <Button onClick={openSignUpModalHandler}>Sign Up</Button>
            <p>Already have an account?</p>
            <Button onClick={openSignInModalHandler}>Sign In</Button>
        </section>
    )
}

export default LoginOptions
