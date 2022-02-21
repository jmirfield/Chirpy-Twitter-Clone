import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { loginRequest } from '../../actions/auth'
import Modal from '../UI/Modal/Modal'
import Button from '../UI/Button/Button'
import classes from './Signin.module.css'

const SignIn = () => {
    const { state, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const onCloseHandler = () => {
        dispatch({ type: 'REMOVE_ERROR' })
        navigate('/')
    }

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch({ type: 'START_LOADING' })
        loginRequest(e.target[0].value, e.target[1].value, dispatch)
    }

    return (
        <Modal onClick={onCloseHandler}>
            <form name="signin-form" className={classes['signin-form']} onSubmit={loginHandler}>
                {state.error && <p className={classes['signin-form__error']}>Incorrect username or password</p>}
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
