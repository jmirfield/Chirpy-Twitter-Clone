import React from 'react'
import styles from './FollowButton.module.css'

const FollowButton = (props) => {
    return (
        <section className={styles.controls}>
            {!props.error && (!props.myProfile
                ? props.isFollowing
                    ? <button
                        onClick={props.onUnfollow}
                        className={styles.unfollow}
                    ><span>Following</span></button>
                    : <button
                        onClick={props.onFollow}
                        className={styles.follow}
                        children='Follow'
                    />
                : <></>//<button>Edit Profile</button>
            )}
        </section>
    )
}

export default FollowButton