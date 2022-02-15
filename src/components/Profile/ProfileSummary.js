import React from 'react'
import classes from './ProfileSummary.module.css'

const ProfileSummary = (props) => {
    const unfollowRequest = async () => {
        try {
            await fetch(`http://localhost:3001/relationships/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                },
                body: JSON.stringify({ id: props.id })
            })
            props.dispatch({ type: 'UNFOLLOW' })
        } catch (e) {
            console.log(e)
        }
    }

    const followRequest = async () => {
        try {
            await fetch(`http://localhost:3001/relationships/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                },
                body: JSON.stringify({ id: props.id })
            })
            props.dispatch({ type: 'FOLLOW' })
        } catch (e) {
            console.log(e)
        }
    }

    const followHandler = () => {
        followRequest()
    }

    const unfollowHandler = async () => {
        unfollowRequest()
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