import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContext from '../../context/MainContext'
import Modal from '../UI/Modal/Modal'
import Button from '../UI/Button/Button'
import classes from './Signup.module.css'

const SignUp = () => {
    const ctx = useContext(MainContext)
    const navigate = useNavigate()

    const onCloseHandler = () => {
        navigate('/')
    }

    const submitPlaceholder = (e) => {
        e.preventDefault()
        console.log('sign up test')
    }

    return (
        <Modal onClick={onCloseHandler}>
            <form name="signup-form" className={classes['signup-form']} onSubmit={submitPlaceholder}>
                <div className={classes['signup-form__control']}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            placeholder='Enter username'
                            autoComplete='off'
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
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Enter password'
                        />
                    </div>
                    <div>
                        <label htmlFor='confirm-password'>Confirm Password</label>
                        <input
                            type='password'
                            id='confirm-password'
                            name='confirm-password'
                            placeholder='Confirm password'
                        />
                    </div>
                </div>
                <div className={classes['signup-form__action']}>
                    <Button>Sign Up</Button>
                    <Button type='button' onClick={onCloseHandler}>Cancel</Button>
                </div>
            </form>
        </Modal>
    )
}

export default SignUp
