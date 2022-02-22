import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../UI/Modal/Modal'
import Button from '../UI/Button/Button'
import styles from './Signup.module.css'

const SignUp = () => {
    const navigate = useNavigate()
    const [usernameText, setUsernameText] = useState('')
    const [emailText, setEmailText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [confirmPasswordText, setConfirmPasswordText] = useState('')

    const onCloseHandler = () => {
        navigate('/')
    }

    const submitPlaceholder = (e) => {
        e.preventDefault()
        if(passwordText !== confirmPasswordText)return
        console.log('test')
    }

    const usernameChangeHandler = (e) => {
        setUsernameText(e.target.value)
    }

    const emailChangeHandler = (e) => {
        setEmailText(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        setPasswordText(e.target.value)
    }

    const confirmPasswordChangeHandler = (e) => {
        setConfirmPasswordText(e.target.value)
    }

    return (
        <Modal onClick={onCloseHandler}>
            <form name="signup-form" className={styles['signup-form']} onSubmit={submitPlaceholder}>
                <div className={styles['signup-form__control']}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            placeholder='Enter username'
                            autoComplete='off'
                            value={usernameText}
                            onChange={usernameChangeHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            placeholder='Enter email'
                            autoComplete='off'
                            value={emailText}
                            onChange={emailChangeHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Enter password'
                            value={passwordText}
                            onChange={passwordChangeHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor='confirm-password'>Confirm Password</label>
                        <input
                            type='password'
                            id='confirm-password'
                            name='confirm-password'
                            placeholder='Confirm password'
                            value={confirmPasswordText}
                            onChange={confirmPasswordChangeHandler}
                        />
                    </div>
                </div>
                <div className={styles['signup-form__action']}>
                    <Button>Sign Up</Button>
                    <Button type='button' onClick={onCloseHandler}>Cancel</Button>
                </div>
            </form>
        </Modal>
    )
}

export default SignUp
