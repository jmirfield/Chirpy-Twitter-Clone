import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { getUserLikesRequest } from '../../actions/profile'
import useFeed from '../../hooks/useFeed'
import ChirpList from '../Chirps/ChirpList'

const ProfileLikes = () => {
    const { profile } = useOutletContext()
    const [{ feed, isLoading, error }, feedDispatch] = useFeed(getUserLikesRequest.bind(this, profile.likes))

    return (
        <ChirpList
            chirps={feed}
            dispatch={feedDispatch}
            error={error}
            isLoading={isLoading}
        />
    )
}

export default ProfileLikes