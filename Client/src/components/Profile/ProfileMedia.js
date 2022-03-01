import React, { useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import { getUserProfileMediaRequest } from '../../actions/profile'
import useFeed from '../../hooks/useFeed'
import ChirpList from '../Chirps/ChirpList'

const ProfileMedia = () => {
    const [{ feed, isLoading, error }, feedDispatch] = useFeed()
    const { profile } = useOutletContext()
    const { _id, profileImage } = profile
    const params = useParams()

    useEffect(() => {
        getUserProfileMediaRequest(_id, profileImage, params.user, feedDispatch)
        return () => {
            feedDispatch({type: 'RESET'})
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

export default ProfileMedia