import React from 'react'
import styles from './ProfileImage.module.css'

const ProfileImage = (props) => {
    const src = !props.src ? 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png' : props.src
    const profileClass = props.className ? `${styles.image} ${props.className}` : styles.image

    return (
        <img
            src={src}
            className={profileClass}
            onClick={props.onClick}
            style={props.style}
        />
    )
}

export default ProfileImage