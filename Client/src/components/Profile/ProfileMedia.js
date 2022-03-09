import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { getUserProfileMediaRequest } from '../../actions/profile'
import useFeed from '../../hooks/useFeed'
import ChirpList from '../Chirps/ChirpList'

const ProfileMedia = () => {
    const { profile } = useOutletContext()
    const [{ feed, isLoading, error }, feedDispatch] = useFeed(getUserProfileMediaRequest.bind(this, profile))

    return (
        <ChirpList
            chirps={feed}
            dispatch={feedDispatch}
            error={error}
            isLoading={isLoading}
        />
    )
}

export default ProfileMedia