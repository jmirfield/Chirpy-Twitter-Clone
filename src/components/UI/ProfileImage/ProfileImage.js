import React from 'react'
import classes from './ProfileImage.module.css'

const ProfileImage = (props) => {
    const src = props.default ? 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png' : ''
    return (
        <img
            src={src}
            className={`${classes.image} ${props.className}`}
        />
    )
}

export default ProfileImage