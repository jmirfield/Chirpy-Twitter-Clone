import React from 'react'
import { useParams } from 'react-router-dom'
import { getUserFollowingsRequest } from '../../actions/profile'
import useRelationship from '../../hooks/useRelationship'
import LoadingFeed from '../Loading/LoadingFeed'
import ProfileList from './ProfileList'


const ProfileFollowings = () => {
    const { user } = useParams()
    const followings = useRelationship(getUserFollowingsRequest.bind(this, user))
    
    if (followings.loading) return <LoadingFeed height={30} width={30} />

    return <ProfileList users={followings.list} />
}

export default ProfileFollowings