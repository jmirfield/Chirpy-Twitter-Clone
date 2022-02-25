import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserFollowingsRequest } from '../../actions/profile'
import LoadingFeed from '../Loading/LoadingFeed'
import ProfileList from './ProfileList'


const ProfileFollowings = () => {
    const { user } = useParams()
    const [followings, setFollowings] = useState({ loading: true, list: [] })

    const popFollowHandler = (users) => {
        setFollowings({ loading: false, list: users })
    }

    useEffect(() => {
        getUserFollowingsRequest(user, popFollowHandler)
    }, [])

    if (followings.loading) return (
        <div style={{ 'marginTop': '1rem' }}>
            <LoadingFeed height={30} width={30} />
        </div>
    )

    return (
        <ProfileList users={followings.list} />
    )
}

export default ProfileFollowings