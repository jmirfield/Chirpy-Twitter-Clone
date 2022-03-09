import React, { useContext } from 'react'
import { useOutletContext } from 'react-router-dom'
import { getUserProfileFeedRequest } from '../../actions/profile'
import AuthContext from '../../context/AuthContext'
import useFeed from '../../hooks/useFeed'
import ChirpList from '../Chirps/ChirpList'

const ProfileFeed = () => {
    const { state } = useContext(AuthContext)
    const { profile } = useOutletContext()
    const [{ feed, isLoading, error }, feedDispatch] = useFeed(getUserProfileFeedRequest.bind(this, { profile, user: state.user }))

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