import React, { useEffect, useContext, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import MainContext from '../../context/MainContext';
import useFeed from '../../hooks/useFeed';
import ChirpList from '../Chirps/ChirpList';
import LoadingFeed from '../Loading/LoadingFeed';
import classes from './Profile.module.css'
import ProfileHeader from './ProfileHeader';
import ProfileSummary from './ProfileSummary';

const initialState = {
    isFollow: false,
    followerCount: 0,
    followingCount: 0
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'PROFILE_READ':
            return {
                ...state,
                isFollow: action.payload.isFollow,
                followerCount: action.payload.followerCount,
                followingCount: action.payload.followingCount
            }
        default:
            return state
    }
}

const Profile = (props) => {
    const params = useParams()
    const navigate = useNavigate()
    const { state } = useContext(MainContext)
    const myProfile = params.user === state.user
    const [profile, dispatch] = useReducer(reducer, initialState)
    const [{ feed, isLoading, error }, feedDispatch] = useFeed()

    const getUserProfileFeed = async () => {
        try {
            const response = await fetch(`http://localhost:3001/chirps/auth/${params.user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            })
            const {
                feed,
                likedChirps,
                retweetedChirps,
                isFollowing,
                followingCount,
                followerCount
            } = await response.json()
            feedDispatch({
                type: 'INIT_SYNC',
                payload: {
                    feed,
                    liked: likedChirps,
                    rechirped: retweetedChirps
                }
            })
            dispatch({
                type: 'PROFILE_READ',
                payload: {
                    isFollow: isFollowing,
                    followingCount: followingCount || 0,
                    followerCount: followerCount || 0
                }
            })
        } catch (e) {
            feedDispatch({ type: 'ERROR' })
        }
    }

    const goBackHandler = e => {
        e.preventDefault()
        navigate(-1)
    }

    useEffect(() => {
        feedDispatch({ type: 'CHANGE_USER' })
        document.title = `@${params.user} / Chirpy`
        window.scrollTo(0, 0);
        getUserProfileFeed()
    }, [params.user])

    if (isLoading) {
        return (
            <LoadingFeed />
        )
    }

    if (error) {
        return <span>User not found</span>
    }

    return (
        <>
            <ProfileHeader
                user={params.user}
                chirpCount={feed.length}
                onBackButton={goBackHandler}
            />
            <ProfileSummary
                myProfile={myProfile}
                user={params.user}
                isFollowing={profile.isFollow}
            />
            <ChirpList
                chirps={feed}
                dispatch={feedDispatch}
                myProfile={myProfile}
            />

        </>
    )
};

export default Profile;
