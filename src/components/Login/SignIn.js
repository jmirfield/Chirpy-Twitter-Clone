import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../UI/Modal/Modal'
import Form from '../UI/Form/Form'
import classes from './Signin.module.css'
import MainContext from '../../context/MainContext'

const SignIn = () => {
    const ctx = useContext(MainContext)
    const [isFormValid, setIsFormValid] = useState(false)

    const navigate = useNavigate()

    const onCloseHandler = () => {
        navigate('/')
    }

    return (
        <Modal onClick={onCloseHandler}>
            <Form formFor={'Sign in'} onSubmit={ctx.onLogin}>
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
        </Modal>
    )
}

export default SignIn
