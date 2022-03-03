import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { loginRequest } from '../../actions/auth'
import AuthContext from '../../context/AuthContext'
import Modal from '../UI/Modal/Modal'
import Button from '../UI/Button/Button'
import styles from './styles.module.css'

const SignIn = () => {
    const { state, dispatch } = useContext(AuthContext)
    const { register, formState: { errors, isValid, isSubmitted }, handleSubmit } = useForm({});
    const navigate = useNavigate()

    const onCloseHandler = () => {
        dispatch({ type: 'REMOVE_ERROR' })
        navigate('/')
    }

    const onSubmit = (data) => {
        dispatch({ type: 'START_LOADING' })
        loginRequest(data, dispatch)
    }

    return (
        <Modal onClick={onCloseHandler}>
            <form name="signin-form" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                {state.error && <p className={styles.error}>Incorrect username or password</p>}
                <section className={styles.form__control}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
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
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        {...register("password", {
                            required: "You must specify a password",
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })}
                    />
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </section>
                <section className={styles.form__action}>
                    <Button disabled={!isValid && isSubmitted}>Sign In</Button>
                    <Button type='button' onClick={onCloseHandler}>Cancel</Button>
                </section>
            </form>
        </Modal>
    )
}

export default SignIn
