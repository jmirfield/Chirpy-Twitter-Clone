import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserFollowingRequest } from '../../actions/profile'
import LoadingFeed from '../Loading/LoadingFeed'


const ProfileFollowing = () => {
    const { user } = useParams()
    const [following, setFollowing] = useState({ loading: true, list: [] })

    const popFollowHandler = (users) => {
        setFollowing({ loading: false, list: users })
    }

    useEffect(() => {
        getUserFollowingRequest(user, popFollowHandler)
    }, [])

    if (following.loading) return (
        <div style={{ 'marginTop': '1rem' }}>
            <LoadingFeed height={30} width={30} />
        </div>
    )

    return (
        <li>
            {following.list.map((user, idx) => <ul key={idx}>{user}</ul>)}
        </li>
    )
}

export default ProfileFollowing