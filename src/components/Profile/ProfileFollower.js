import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserFollowersRequest } from '../../actions/profile'
import LoadingFeed from '../Loading/LoadingFeed'
import ProfileList from './ProfileList'


const ProfileFollowers = () => {
    const { user } = useParams()
    const [followers, setFollowers] = useState({ loading: true, list: [] })

    const popFollowHandler = (users) => {
        setFollowers({ loading: false, list: users })
    }

    useEffect(() => {
        getUserFollowersRequest(user, popFollowHandler)
    }, [])

    if (followers.loading) return (
        <div style={{ 'marginTop': '1rem' }}>
            <LoadingFeed height={30} width={30} />
        </div>
    )

    return (
        <ProfileList users={followers.list} />
    )
}

export default ProfileFollowers