import React, { useReducer, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import FollowButton from '../UI/FollowButton/FollowButton'
import styles from './styles.module.css'
import { followRequest, unfollowRequest } from '../../actions/profile'
import AuthContext from '../../context/AuthContext'

const initialState = {
    isFollow: false
}

const followReducer = (state, action) => {
    switch (action.type) {
        case 'FOLLOW':
            return { isFollow: true }
        case 'UNFOLLOW':
            return { isFollow: false }
    }
}

const ProfileList = (props) => {
    return (
        <li className={styles.profile__list}>
            {props.users.map((user) => {
                return (
                    <ProfileMin
                        key={user._id}
                        username={user.username}
                        profileImage={user.profileImage}
                        isFollow={user.isFollowing}
                        _id={user._id}
                    />
                )
            }
            )}
        </li>
    )
}

const ProfileMin = (props) => {
    const [profile, dispatch] = useReducer(followReducer, initialState)
    const { state } = useContext(AuthContext)
    useEffect(() => {
        if (props.isFollow) dispatch({ type: 'FOLLOW' })
    }, [])

    const onFollowHandler = (e) => {
        followRequest(props._id, dispatch)
        e.stopPropagation()
        e.preventDefault()
    }

    const onUnFollowHandler = (e) => {
        unfollowRequest(props._id, dispatch)
        e.stopPropagation()
        e.preventDefault()
    }

    return (
        <ul className={styles.profile__item}>
            <Link to={`/${props.username}`}>
                <section className={styles.profile__user}>
                    <ProfileImage
                        className={styles.profile__user__icon}
                        src={props.profileImage}
                    />
                    <span>{props.username}</span>
                </section>
                <FollowButton
                    onFollow={onFollowHandler}
                    onUnfollow={onUnFollowHandler}
                    isFollowing={profile.isFollow}
                    myProfile={props.username === state.user}
                />
            </Link>
        </ul>
    )
}

export default ProfileList