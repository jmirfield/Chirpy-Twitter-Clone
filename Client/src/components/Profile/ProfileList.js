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
                        key={user.id}
                        username={user.username}
                        profileImage={user.profileImage}
                        isFollow={user.isFollowing}
                        id={user.id}
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

    return (
        <ul className={styles.profile__item}>
            <Link to={`/${props.username}`}>
                <ProfileImage
                    className={styles.profile__user__icon}
                    src={props.profileImage}
                />
                <span className={styles.profile__user}>{props.username}</span>
            </Link>
            <FollowButton
                onFollow={followRequest.bind(this, props.id, dispatch)}
                onUnfollow={unfollowRequest.bind(this, props.id, dispatch)}
                isFollowing={profile.isFollow}
                myProfile={props.username === state.user}
            />
        </ul>
    )
}

export default ProfileList