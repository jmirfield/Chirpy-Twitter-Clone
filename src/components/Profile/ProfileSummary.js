import React from 'react'
import classes from './ProfileSummary.module.css'

const ProfileSummary = (props) => {
    return (
        <section className={classes['profile__summary']}>
            <section className={classes['profile__summary-banner']} />
            <section className={classes['profile__summary-user']}>
                <section className={classes['profile__summary-user-controls']}>
                    {!props.myProfile
                        ? props.isFollowing
                            ? <button>Following</button>
                            : <button>Follow</button>
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
                {`${props.followingCount} Follower`}
                </span>
            </section>
            {/* <section className={classes['profile__summary-picture']} /> */}
        </section>
    )
}

export default ProfileSummary