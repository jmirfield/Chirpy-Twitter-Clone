import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { request } from '../../api/request'
import MainContext from '../../context/MainContext'
import useFeed from '../../hooks/useFeed'
import ChirpList from '../Chirps/ChirpList'

const ProfileFeed = () => {
    const { state } = useContext(MainContext)
    const [{ feed, isLoading, error }, feedDispatch] = useFeed()
    const params = useParams()
    const myProfile = params.user === state.user
    const getUserProfileFeed = async () => {
        try {
            const {
                feed,
                likedChirps,
                retweetedChirps
            } = await request.getUserProfileFeed(params.user)
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
        getUserProfileFeed()
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