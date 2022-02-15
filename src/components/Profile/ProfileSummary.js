import React, { useState } from 'react'
import classes from './ProfileSummary.module.css'

const ProfileSummary = (props) => {
    const followHandler = () => {
        console.log('follow')
        props.dispatch({ type: 'FOLLOW' })
    }
    const unfollowHandler = () => {
        console.log('unfollow')
        props.dispatch({ type: 'UNFOLLOW' })
    }
    return (
        <section className={classes['profile__summary']}>
            <section className={classes['profile__summary-banner']} />
            <section className={classes['profile__summary-user']}>
                <section className={classes['profile__summary-user-controls']}>
                    {!props.myProfile
                        ? props.isFollowing
                            ? <button onClick={unfollowHandler}>Following</button>
                            : <button onClick={followHandler}>Follow</button>
                        : <button>Edit Profile</button>
                    }
                </section>
                <span id={classes.user}>
                    {props.user}
                </span>
                <span>
                    {`${props.followingCount} Following`}
                </span>
                <span>
                    {`${props.followerCount} Follower`}
                </span>
            </section>
            {/* <section className={classes['profile__summary-picture']} /> */}
        </section>
    )
}

export default ProfileSummary