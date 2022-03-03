import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { followRequest, unfollowRequest, uploadProfileImageRequest, uploadProfileBannerRequest } from '../../actions/profile'
import FollowButton from '../UI/FollowButton/FollowButton'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import styles from './styles.module.css'

const ProfileSummary = (props) => {
    const { state, dispatch } = useContext(AuthContext)
    const myProfile = props.user === state.user

    const profilePicRef = useRef(null)
    const profileBannerRef = useRef(null)
    
    const [banner, setBanner] = useState(props.bannerImage || null)

    const updateProfilePictureHandler = () => {
        profilePicRef.current.click()
    }

    const updateProfileBannerHandler = () => {
        profileBannerRef.current.click()
    }

    const profilePicHandler = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('image', e.target.files[0])
        uploadProfileImageRequest(data, (data) => {
            dispatch({ type: 'NEW_PROFILE_PIC', payload: data })
        })
    }

    const profileBannerHandler = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('image', e.target.files[0])
        uploadProfileBannerRequest(data, (data) => {
            setBanner(data)
        })
    }

    return (
        <>
            <img
                className={styles['profile__banner']}
                src={banner}
                onClick={myProfile ? updateProfileBannerHandler : null}
                style={myProfile ? {cursor: 'pointer'} : null}
            />
            {myProfile && <input
                type='file'
                style={{ 'display': 'none' }}
                ref={profileBannerRef}
                onChange={profileBannerHandler}
                accept='image/*'
            />}
            <ProfileImage
                className={styles['profile__picture']}
                onClick={myProfile ? updateProfilePictureHandler : null}
                src={myProfile ? state.profileImage : props.profileImage}
                style={myProfile ? {cursor: 'pointer'} : null}
            />
            {myProfile && <input
                type='file'
                style={{ 'display': 'none' }}
                ref={profilePicRef}
                onChange={profilePicHandler}
                accept='image/*'
            />}
            <section className={styles['profile__details']}>
                <FollowButton
                    onFollow={followRequest.bind(this, props._id, props.dispatch)}
                    onUnfollow={unfollowRequest.bind(this, props._id, props.dispatch)}
                    isFollowing={props.isFollowing}
                    myProfile={myProfile}
                    error={props.error}
                />
                <span id={styles.user}>{props.user}</span>
                {!props.error &&
                    <section className={styles['profile__follow']}>
                        <Link to='following'>
                            <span>{`${props.followingCount} `}</span>
                            <span className={styles['profile__span']}>Following</span>
                        </Link>
                        <Link to='follower'>
                            <span>{`${props.followerCount} `}</span>
                            <span className={styles['profile__span']}>Followers</span>
                        </Link>
                    </section>
                }
            </section>
        </>
    )
}

export default ProfileSummary