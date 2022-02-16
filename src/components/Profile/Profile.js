import React, { useEffect, useContext, useReducer } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom'
import MainContext from '../../context/MainContext';
import LoadingFeed from '../Loading/LoadingFeed';
import classes from './Profile.module.css'
import ProfileHeader from './ProfileHeader';
import ProfileSummary from './ProfileSummary';

const initialState = {
    id: '',
    isFollow: false,
    followerCount: 0,
    followingCount: 0,
    feedCount: 0,
    isLoading: true,
    error: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'PROFILE_READ':
            return {
                ...state,
                id: action.payload.id,
                isFollow: action.payload.isFollow,
                followerCount: action.payload.followerCount,
                followingCount: action.payload.followingCount,
                feedCount: action.payload.feedCount,
                isLoading: false
            }
        case 'FOLLOW':
            return {
                ...state,
                followerCount: state.followerCount + 1,
                isFollow: true
            }
        case 'UNFOLLOW':
            return {
                ...state,
                followerCount: state.followerCount - 1,
                isFollow: false
            }
        case 'CHANGE_USER':
            return {
                ...state,
                isLoading: true,
                error: false
            }
        case 'ERROR':
            return {
                ...state,
                isLoading: false,
                error: true
            }
        default:
            return state
    }
}

const Profile = () => {
    const { state } = useContext(MainContext)
    const [profile, dispatch] = useReducer(reducer, initialState)
    const params = useParams()
    const navigate = useNavigate()
    const myProfile = params.user === state.user
    console.log(profile)
    const goBackHandler = e => {
        e.preventDefault()
        navigate(-1)
    }

    useEffect(() => {
        dispatch({ type: 'CHANGE_USER' })
        document.title = `@${params.user} / Chirpy`
        window.scrollTo(0, 0);
    }, [params.user])

    if (profile.isLoading) {
        return (
            <>
                <LoadingFeed />
                <Outlet context={{ dispatch }} />
            </>
        )
    }

    if (profile.error) {
        return (
            <>
                <ProfileHeader
                    user='Profile'
                    chirpCount={null}
                    onBackButton={goBackHandler}
                />
                <ProfileSummary
                    user={params.user}
                    error={profile.error}
                />
                <h1 style={{ 'marginLeft': '1rem' }}>
                    Profile does not exist
                </h1>
            </>
        )
    }

    return (
        <>
            <ProfileHeader
                user={params.user}
                chirpCount={profile.feedCount}
                onBackButton={goBackHandler}
            />
            <ProfileSummary
                myProfile={myProfile}
                user={params.user}
                id={profile.id}
                isFollowing={profile.isFollow}
                followerCount={profile.followerCount}
                followingCount={profile.followingCount}
                dispatch={dispatch}
            />
            <Outlet context={{ dispatch }} />
        </>
    )
};

export default Profile;
