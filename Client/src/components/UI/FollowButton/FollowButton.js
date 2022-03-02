import React, { useState } from 'react'
import styles from './FollowButton.module.css'

const FollowButton = (props) => {

    const [hover, setHover] = useState(false)

    const onHoverHandler = () => setHover(true)
    const offHoverHandler = () => setHover(false)

    return (
        <section className={styles.controls}>
            {!props.error && (!props.myProfile
                ? props.isFollowing
                    ? <button
                        onClick={props.onUnfollow}
                        onMouseOver={onHoverHandler}
                        onMouseLeave={offHoverHandler}
                        style={!hover ? null : {
                            color: 'red',
                            backgroundColor: 'rgb(65, 6, 6)',
                            borderColor: 'red'
                        }}
                    >
                        {!hover ? 'Following' : 'Unfollow'}
                    </button>
                    : <button onClick={props.onFollow}>Follow</button>
                : <></>//<button>Edit Profile</button>
            )}
        </section>
    )
}

export default FollowButton