import React from 'react'
import Button from '../Button/Button'
import classes from './Form.module.css'

const Form = ({children, formFor, onSubmit}) => {
    return (
        <form className={classes.form} onSubmit={onSubmit}>
            <div className={classes.control}>
                {children}
            </div>
            <div className={classes.action}>
                <Button>{formFor}</Button>
            </div>
        </form>
    )
}

export default Form
