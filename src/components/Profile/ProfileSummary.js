import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import MainContext from '../../context/MainContext'
import ProfileButton from '../UI/ProfileButton/ProfileButton'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import classes from './ProfileSummary.module.css'

const ProfileSummary = (props) => {
    const { state } = useContext(MainContext)
    const { user } = useParams()
    const myProfile = user === state.user

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
            <section className={classes['profile__banner']} />
            <ProfileImage
                className={classes['profile__picture']}
                default={true}
            />
            <section className={classes['profile__user']}>
                {<ProfileButton
                    onFollow={followHandler}
                    onUnfollow={unfollowHandler}
                    isFollowing={props.isFollowing}
                    myProfile={myProfile}
                    error={props.error}
                />}
                <span id={classes.user}>{user}</span>
                {!props.error &&
                    <section className={classes['profile__follow']}>
                        <Link to='following'>
                            <span>{`${props.followingCount} `}</span>
                            <span className={classes['profile__follow-desc']}>Following</span>
                        </Link>
                        <Link to='follower'>
                            <span>{`${props.followerCount} `}</span>
                            <span className={classes['profile__follow-desc']}>Followers</span>
                        </Link>
                    </section>
                }
            </section>
        </section>
    )
}

export default ProfileSummary