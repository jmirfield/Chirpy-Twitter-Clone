import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { getUserLikesRequest } from '../../actions/profile'
import useFeed from '../../hooks/useFeed'
import ChirpList from '../Chirps/ChirpList'

const ProfileLikes = () => {
    const [{ feed, isLoading, error }, feedDispatch] = useFeed()
    const { profile } = useOutletContext()

    useEffect(() => {
        getUserLikesRequest(profile.likes, feedDispatch)
        return () => {
            feedDispatch({ type: 'RESET' })
        }
    }, [])

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