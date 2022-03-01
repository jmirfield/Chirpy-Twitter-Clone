import React, { useContext, useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import { getUserProfileFeedRequest } from '../../actions/profile'
import AuthContext from '../../context/AuthContext'
import useFeed from '../../hooks/useFeed'
import ChirpList from '../Chirps/ChirpList'

const ProfileFeed = () => {
    const { state } = useContext(AuthContext)
    const { profile } = useOutletContext()
    const { _id, profileImage } = profile
    const [{ feed, isLoading, error }, feedDispatch] = useFeed()
    const params = useParams()
    const myProfile = params.user === state.user

    useEffect(() => {
        getUserProfileFeedRequest(_id, profileImage, params.user, myProfile, feedDispatch)
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

export default ProfileFeed