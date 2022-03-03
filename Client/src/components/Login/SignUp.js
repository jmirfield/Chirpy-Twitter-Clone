import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signupRequest } from '../../actions/auth'
import AuthContext from '../../context/AuthContext'
import Modal from '../UI/Modal/Modal'
import Button from '../UI/Button/Button'
import styles from './styles.module.css'

const SignUp = () => {
    const { state, dispatch } = useContext(AuthContext)
    const { register, formState: { errors, isValid, isSubmitted }, handleSubmit, watch } = useForm({});
    const navigate = useNavigate()
    const onCloseHandler = () => {
        navigate('/')
    }

    const onSubmit = (data) => {
        dispatch({ type: 'START_LOADING' })
        signupRequest(data, dispatch)
    }

    const password = useRef({})
    password.current = watch("password", "")

    return (
        <Modal onClick={onCloseHandler}>
            <form name="signup-form" className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
            {state.error && <p className={styles.error}>Username or Email already exists!</p>}
                <section className={styles['form__control']}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type="text"
                        autoComplete='off'
                        {...register("username", {
                            required: 'You must enter a username',
                            minLength: {
                                value: 4,
                                message: 'Must be at least 4 characters'
                            },
                            maxLength: {
                                value: 25,
                                message: 'Must not be longer than 25 characters'
                            },

                        })}
                    />
                    {errors.username && <p className={styles.error}>{errors.username.message}</p>}
                    <label htmlFor='email'>Email</label>
                    <input
                        type="text"
                        autoComplete='off'
                        {...register("email", {
                            required: 'You must enter an email',
                            minLength: {
                                value: 5,
                                message: 'Must be at least 5 characters'
                            },
                            maxLength: {
                                value: 64,
                                message: 'Must not be longer than 64 characters'
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "You must specify a password",
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })}
                    />
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                    <label htmlFor='confirm-password'>Confirm Password</label>
                    <input
                        type="password"
                        {...register('confirm-password', {
                            validate: (value) => value === password.current || "The passwords do not match"
                        })}
                    />
                    {errors['confirm-password'] && <p className={styles.error}>{errors['confirm-password'].message}</p>}
                </section>
                <section className={styles['form__action']}>
                    <Button disabled={!isValid && isSubmitted}>Sign Up</Button>
                    <Button type='button' onClick={onCloseHandler}>Cancel</Button>
                </section>
            </form>
        </Modal>
    )
}

export default SignUp
