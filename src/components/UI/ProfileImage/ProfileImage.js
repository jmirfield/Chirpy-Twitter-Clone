import React from 'react'
import styles from './ProfileImage.module.css'

const ProfileImage = (props) => {
    const src = props.default ? 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png' : ''
    const profileClass = props.className ? `${styles.image} ${props.className}` : styles.image
    return (
        <img
            src={src}
            className={profileClass}
        />
    )
}

export default ProfileImage