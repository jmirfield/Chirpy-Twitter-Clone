import React from 'react'
import { useParams } from 'react-router-dom'
import { getUserFollowersRequest } from '../../actions/profile'
import useRelationship from '../../hooks/useRelationship'
import LoadingFeed from '../Loading/LoadingFeed'
import ProfileList from './ProfileList'


const ProfileFollowers = () => {
    const { user } = useParams()
    const followers = useRelationship(getUserFollowersRequest.bind(this, user))

    if (followers.loading) return <LoadingFeed height={30} width={30} />

    return <ProfileList users={followers.list} />
}

export default ProfileFollowers