import React from 'react'
import styles from './ProfileButton.module.css'

const ProfileButton = (props) => {
    return (
        <section className={styles.controls}>
            {!props.error && (!props.myProfile
                ? props.isFollowing
                    ? <button onClick={props.onUnfollow}>Following</button>
                    : <button onClick={props.onFollow}>Follow</button>
                : <button>Edit Profile</button>
            )}
        </section>
    )
}

export default ProfileButton