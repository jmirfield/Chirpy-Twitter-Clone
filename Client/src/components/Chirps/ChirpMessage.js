import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const ChirpMessage = ({owner, id, message}) => {
    return (
        <Link
            to={`/${owner}/status/${id}`}
            className={styles.chirp__message}
        >
            <p>{message}</p>
        </Link>
    )
}

export default ChirpMessage