import React from 'react'
import styles from './Card.module.css'

const Card = ({className, children}) => {
    const cardClass = className ? `${styles.card} ${className}` : styles.card
    return (
        <div className={cardClass}>
            {children}
        </div>
    )
}

export default Card
