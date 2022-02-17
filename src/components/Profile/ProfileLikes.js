import React, { useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import useFeed from '../../hooks/useFeed'
import ChirpList from '../Chirps/ChirpList'

const ProfileLikes = () => {
    const [{ feed, isLoading, error }, feedDispatch] = useFeed()
    const params = useParams()
    const { likes, dispatch } = useOutletContext()
    const getUserLikes = async () => {
        try {
            const response = await fetch(`http://localhost:3001/chirps/liked`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                },
                body: JSON.stringify(likes)
            })
            const {
                feed,
                likedChirps,
                retweetedChirps

            } = await response.json()
            feedDispatch({
                type: 'INIT_SYNC',
                payload: {
                    feed,
                    liked: likedChirps,
                    rechirped: retweetedChirps,
                    isLikePage: true
                }
            })
        } catch (e) {
            console.log(e)
            feedDispatch({ type: 'ERROR' })
        }
    }

    useEffect(() => {
        getUserLikes()
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