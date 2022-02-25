import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const ChirpImage = ({owner, id, imageURL}) => {
    return (
        <Link to={`/${owner}/status/${id}`} >
            <img src={imageURL} className={styles['chirp__image']} />
        </Link>
    )
}

export default ChirpImage