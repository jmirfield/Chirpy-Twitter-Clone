import React from 'react'
import styles from './Button.module.css'

const Button = ({children, onClick, disabled=false, className, type='submit'}) => {
    const buttonClass = className ? `${styles.button} ${className}` : styles.button
    return (
        <button className={buttonClass} onClick={onClick} disabled={disabled} type={type}>
            {children}
        </button>
    )
}

export default Button
