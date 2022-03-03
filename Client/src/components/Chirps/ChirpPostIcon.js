import React from 'react'
import { Link } from 'react-router-dom'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import styles from './styles.module.css'

const ChirpPostIcon = ({ owner, profileImage }) => {
    return (
        <Link to={`/${owner}`}>
            <ProfileImage
                className={styles['chirp__icon']}
                src={profileImage}
            />
        </Link>
    )
}

export default ChirpPostIcon