import React from 'react'
import classes from './Button.module.css'

const Button = ({children, onClick, disabled=false ,type='submit'}) => {
    return (
        <button className={classes.button} onClick={onClick} disabled={disabled} type={type}>
            {children}
        </button>
    )
}

export default Button
