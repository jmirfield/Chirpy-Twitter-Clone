import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { followRequest, unfollowRequest } from '../../actions/profile'
import ProfileButton from '../UI/ProfileButton/ProfileButton'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import styles from './ProfileSummary.module.css'

const ProfileSummary = (props) => {
    const { state } = useContext(AuthContext)
    const { user } = useParams()
    const myProfile = user === state.user

    return (
        <section className={styles['profile__summary']}>
            <section className={styles['profile__banner']} />
            <ProfileImage
                className={styles['profile__picture']}
                default={true}
            />
            <section className={styles['profile__user']}>
                {<ProfileButton
                    onFollow={followRequest.bind(this, props.id, props.dispatch)}
                    onUnfollow={unfollowRequest.bind(this, props.id, props.dispatch)}
                    isFollowing={props.isFollowing}
                    myProfile={myProfile}
                    error={props.error}
                />}
                <span id={styles.user}>{user}</span>
                {!props.error &&
                    <section className={styles['profile__follow']}>
                        <Link to='following'>
                            <span>{`${props.followingCount} `}</span>
                            <span className={styles['profile__follow-desc']}>Following</span>
                        </Link>
                        <Link to='follower'>
                            <span>{`${props.followerCount} `}</span>
                            <span className={styles['profile__follow-desc']}>Followers</span>
                        </Link>
                    </section>
                }
            </section>
        </section>
    )
}

export default ProfileSummary