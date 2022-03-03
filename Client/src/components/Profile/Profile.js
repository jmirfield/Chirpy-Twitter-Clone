import React, { useEffect, useReducer } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom'
import { initialState, reducer } from '../../reducers/profileReducer';
import { getUserProfileRequest } from '../../actions/profile';
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

    useEffect(() => {
        document.title = `@${params.user} / Chirpy`
        window.scrollTo(0, 0);
        getUserProfileRequest(params.user, dispatch)
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
                user={profile.username}
                chirpCount={profile.chirpCount}
                onBackButton={goBackHandler}
            />
            <ProfileSummary
                _id={profile._id}
                user={profile.username}
                isFollowing={profile.isFollow}
                followerCount={profile.followerCount}
                followingCount={profile.followingCount}
                dispatch={dispatch}
                profileImage={profile.profileImage}
                bannerImage={profile.bannerImage}
            />
            <ProfileTabs tabs={MAIN_TABS} />
            <Outlet context={{ profile, dispatch }} />
        </>
    )

};
export default Profile;