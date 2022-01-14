import React from 'react'
import Button from '../Button/Button'
import classes from './Form.module.css'

const Form = ({children, formFor}) => {
    return (
        <form className={classes.form}>
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
