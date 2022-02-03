import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContext from '../../context/MainContext'
import Modal from '../UI/Modal/Modal'
import Button from '../UI/Button/Button'
import classes from './Signin.module.css'

const SignIn = () => {
    const ctx = useContext(MainContext)
    const navigate = useNavigate()
    const [isFormValid, setIsFormValid] = useState(false)

    const onCloseHandler = () => {
        ctx.onRemoveError()
        navigate('/')
    }

    return (
        <Modal onClick={onCloseHandler}>
            <form name="signin-form" className={classes['signin-form']} onSubmit={ctx.onLogin}>
                {ctx.error && <p className={classes['signin-form__error']}>Incorrect username or password</p>}
                <div className={classes['signin-form__control']}>
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
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Enter password'
                        />
                    </div>
                </div>
                <div className={classes['signin-form__action']}>
                    <Button>Sign In</Button>
                    <Button type='button' onClick={onCloseHandler}>Cancel</Button>
                </div>
            </form>
        </Modal>
    )
}

export default SignIn
