import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserProfileFeed } from '../../api/request'
import AuthContext from '../../context/AuthContext'
import useFeed from '../../hooks/useFeed'
import ChirpList from '../Chirps/ChirpList'

const ProfileFeed = () => {
    const { state } = useContext(AuthContext)
    const [{ feed, isLoading, error }, feedDispatch] = useFeed()
    const params = useParams()
    const myProfile = params.user === state.user
    const getUserProfileFeedHandler = async () => {
        try {
            const {
                feed,
                likedChirps,
                retweetedChirps
            } = await getUserProfileFeed(params.user)
            feedDispatch({
                type: 'INIT_SYNC',
                payload: {
                    feed,
                    liked: likedChirps,
                    rechirped: retweetedChirps,
                    myProfile
                }
            })
        } catch (e) {
            console.log(e)
            feedDispatch({ type: 'ERROR' })
        }
    }

    useEffect(() => {
        getUserProfileFeedHandler()
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