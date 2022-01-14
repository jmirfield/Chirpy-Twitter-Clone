import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginModal from '../UI/LoginModal/LoginModal'
import Form from '../UI/Form/Form'
import classes from './Signin.module.css'

const SignIn = () => {
    const [isFormValid, setIsFormValid] = useState(false)

    const navigate = useNavigate()

    const onCloseHandler = () => {
        navigate('/')
    }

    return (
        <LoginModal onClick={onCloseHandler}>
            <Form formFor={'Sign in'}>
                <div className={classes.control}>
                    <div>
                        <label type='text'>Username</label>
                        <input />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type='password' />
                    </div>
                </div>
            </Form>
        </LoginModal>
    )
}

export default SignIn
