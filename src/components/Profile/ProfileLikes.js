import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { getUserLikes } from '../../api/request'
import useFeed from '../../hooks/useFeed'
import ChirpList from '../Chirps/ChirpList'

const ProfileLikes = () => {
    const [{ feed, isLoading, error }, feedDispatch] = useFeed()
    const { likes } = useOutletContext()
    const getUserLikesHandler = async () => {
        try {
            const {
                feed,
                likedChirps,
                retweetedChirps

            } = await getUserLikes(likes)
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
        getUserLikesHandler()
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