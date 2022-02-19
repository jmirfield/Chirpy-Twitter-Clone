import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import MainContext from '../../context/MainContext'
import { request } from '../../api/request.js'
import ProfileButton from '../UI/ProfileButton/ProfileButton'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import classes from './ProfileSummary.module.css'

const ProfileSummary = (props) => {
    const { state } = useContext(MainContext)
    const { user } = useParams()
    const myProfile = user === state.user

    const unfollowRequestHandler = async () => {
        try {
            await request.unfollowUser(props.id)
            props.dispatch({ type: 'UNFOLLOW' })
        } catch (e) {
            console.log(e)
        }
    }

    const followRequestHandler = async () => {
        try {
            await request.followUser(props.id)
            props.dispatch({ type: 'FOLLOW' })
        } catch (e) {
            console.log(e)
        }
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
                    onFollow={followRequestHandler}
                    onUnfollow={unfollowRequestHandler}
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