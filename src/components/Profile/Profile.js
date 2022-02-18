import React, { useEffect, useReducer } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom'
import { MAIN_TABS } from '../../constants/tab';
import LoadingFeed from '../Loading/LoadingFeed';
import ProfileHeader from './ProfileHeader';
import ProfileSummary from './ProfileSummary';
import ProfileTabs from './ProfileTabs'

const initialState = {
    id: '',
    isFollow: false,
    followerCount: 0,
    followingCount: 0,
    chirpCount: 0,
    likes: [],
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
                chirpCount: action.payload.chirpCount,
                likes: action.payload.likes,
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
                id: '',
                isFollow: false,
                followerCount: 0,
                followingCount: 0,
                chirpCount: 0,
                likes: [],
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
    const [profile, dispatch] = useReducer(reducer, initialState)
    const params = useParams()
    const navigate = useNavigate()

    const goBackHandler = e => {
        e.preventDefault()
        navigate(-1)
    }

    const getUserProfile = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/profile/${params.user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            })
            const {
                id,
                isFollowing,
                followingCount,
                followerCount,
                chirpCount,
                likes
            } = await response.json()
            dispatch({
                type: 'PROFILE_READ',
                payload: {
                    id,
                    isFollow: isFollowing,
                    followingCount: followingCount || 0,
                    followerCount: followerCount || 0,
                    chirpCount: chirpCount,
                    likes
                }
            })
        } catch (e) {
            console.log(e)
            dispatch({ type: 'ERROR' })
        }
    }


    useEffect(() => {
        document.title = `@${params.user} / Chirpy`
        window.scrollTo(0, 0);
        getUserProfile()
        return () => {
            dispatch({ type: 'CHANGE_USER' })
        }
    }, [params.user])

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

    if (profile.isLoading) {
        return <LoadingFeed />
    }

    return (
        <>
            <ProfileHeader
                chirpCount={profile.chirpCount}
                onBackButton={goBackHandler}
            />
            <ProfileSummary
                id={profile.id}
                isFollowing={profile.isFollow}
                followerCount={profile.followerCount}
                followingCount={profile.followingCount}
                dispatch={dispatch}
            />
            <ProfileTabs tabs={MAIN_TABS} />
            <Outlet context={{ likes: profile.likes, dispatch }} />
        </>
    )

};
export default Profile;