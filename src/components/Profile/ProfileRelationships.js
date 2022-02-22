import React from 'react'
import { useNavigate, Outlet, useParams } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import ProfileTabs from './ProfileTabs'
import { FOLLOW_TABS } from '../../constants/tab'

const ProfileFollowing = () => {
    const navigate = useNavigate()
    const goBackHandler = e => {
        e.preventDefault()
        navigate('')
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