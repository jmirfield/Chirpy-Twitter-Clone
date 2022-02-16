import React, { useContext, useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import MainContext from '../../context/MainContext'
import useFeed from '../../hooks/useFeed'
import ChirpList from '../Chirps/ChirpList'

const ProfileFeed = () => {
    const { state } = useContext(MainContext)
    const [{ feed, isLoading, error }, feedDispatch] = useFeed()
    const { dispatch } = useOutletContext()
    const params = useParams()
    const myProfile = params.user === state.user

    const getUserProfileFeed = async () => {
        try {
            const response = await fetch(`http://localhost:3001/chirps/auth/${params.user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            })
            const {
                feed,
                likedChirps,
                retweetedChirps,
                id,
                isFollowing,
                followingCount,
                followerCount
            } = await response.json()
            feedDispatch({
                type: 'INIT_SYNC',
                payload: {
                    feed,
                    liked: likedChirps,
                    rechirped: retweetedChirps,
                    myProfile
                }
            })
            dispatch({
                type: 'PROFILE_READ',
                payload: {
                    id,
                    isFollow: isFollowing,
                    followingCount: followingCount || 0,
                    followerCount: followerCount || 0,
                    feedCount: feed.length
                }
            })
        } catch (e) {
            feedDispatch({ type: 'ERROR' })
            dispatch({ type: 'ERROR' })
        }
    }

    useEffect(() => {
        getUserProfileFeed()
    }, [])

    if (isLoading) {
        return <></>
    }

    return (
        <ChirpList
            chirps={feed}
            dispatch={feedDispatch}
        />
    )
}

export default ProfileFeed