import React from 'react'
import { Link } from 'react-router-dom'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import styles from './styles.module.css'

const ChirpProfileIcon = ({ owner, image }) => {
    return (
        <Link to={`/${owner}`}>
            <ProfileImage
                className={styles['chirp__icon']}
                src={image}
            />
        </Link>
    )
}

export default ChirpProfileIcon