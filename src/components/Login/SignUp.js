import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import LoginModal from '../UI/LoginModal/LoginModal'
import Form from '../UI/Form/Form'
import classes from './Signup.module.css'

const SignUp = () => {
    const { register, watch, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const onCloseHandler = () => {
        navigate('/')
    }

    return (
        <LoginModal onClick={onCloseHandler}>
            <Form formFor={'Sign up'}>
                <div className={classes.control}>
                    <div>
                        <label>Username</label>
                        <input
                            {...register("multipleErrorInput", {
                                required: "This is required.",
                                pattern: {
                                    value: /d+/,
                                    message: "This input is number only."
                                },
                                maxLength: {
                                    value: 10,
                                    message: "This input exceed maxLength."
                                }
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="multipleErrorInput"
                            render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <p key={type}>{message}</p>
                                ))
                            }
                        />
                </div>
                {/* <div>
                    <label type='text'>E-Mail</label>
                    <input></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password'></input>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type='password'></input>
                </div> */}
            </div>
        </Form>
        </LoginModal >
    )
}

export default SignUp
