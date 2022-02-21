import React, { useEffect, useReducer } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom'
import { initialState, reducer } from '../../reducers/profileReducer';
import { getUserProfile } from '../../api/request';
import { MAIN_TABS } from '../../constants/tab';
import LoadingFeed from '../Loading/LoadingFeed';
import ProfileHeader from './ProfileHeader';
import ProfileSummary from './ProfileSummary';
import ProfileTabs from './ProfileTabs'

const Profile = () => {
    const [profile, dispatch] = useReducer(reducer, initialState)
    const params = useParams()
    const navigate = useNavigate()

    const goBackHandler = e => {
        e.preventDefault()
        navigate(-1)
    }

    const getUserProfileHandler = async () => {
        try {
            const {
                id,
                isFollowing,
                followingCount,
                followerCount,
                chirpCount,
                likes
            } = await getUserProfile(params.user)
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
            dispatch({ type: 'ERROR' })
        }
    }


    useEffect(() => {
        document.title = `@${params.user} / Chirpy`
        window.scrollTo(0, 0);
        getUserProfileHandler()
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