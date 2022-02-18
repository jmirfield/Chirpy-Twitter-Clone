import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import ProfileTabs from './ProfileTabs'
import { FOLLOW_TABS } from '../../constants/tab'

const ProfileFollowing = () => {
    const navigate = useNavigate()
    const goBackHandler = e => {
        e.preventDefault()
        navigate(-1)
    }
    return (
        <>
            <ProfileHeader
                chirpCount={null}
                onBackButton={goBackHandler}
            />
            <ProfileTabs tabs={FOLLOW_TABS} />
            <Outlet />
        </>
    )
}

export default ProfileFollowing