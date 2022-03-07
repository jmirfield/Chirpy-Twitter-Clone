import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const ChirpReplyHeader = (props) => {
    return (
        <Link className={styles.chirp__reply} to={`/${props.username}`}>
            {`Replying to @${props.username}`}
        </Link>
    )
}

export default ChirpReplyHeader