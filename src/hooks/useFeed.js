import React, { useReducer } from 'react'

const initialState = {
    feed: [],
    isLoading: true,
    error: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT_SYNC':
            return {
                ...state,
                feed: syncFeed(
                    action.payload.feed,
                    action.payload.liked,
                    action.payload.rechirped
                ),
                isLoading: false
            }
        case 'ADD':
            return {
                ...state,
                feed: syncFeed(
                    [action.payload.chirp, ...state.feed],
                    action.payload.liked,
                    action.payload.rechirped
                )
            }
        case 'REMOVE':
            return {
                ...state,
                feed: state.feed.filter(chirp => {
                    if (!chirp.rechirp) return true
                    return chirp.rechirp.original_id !== action.payload.id || action.payload.user !== chirp.owner_username
                })
            }
        case 'LIKE':
            return {
                ...state,
                feed: syncFeed(
                    state.feed,
                    action.payload.liked,
                    action.payload.rechirped
                )
            }
        case 'CHANGE_USER':
            return {
                ...state,
                feed: [],
                isLoading: true
            }
        case 'ERROR':
            return {
                feed: [],
                isLoading: false,
                error: true
            }
    }
}


const syncFeed = (feed, likedChirps, retweetedChirps) => {
    return feed.map(chirp => {
        let isLiked = false;
        let isRechirped = false;
        if (chirp.rechirp) {
            isLiked = likedChirps.includes(chirp.rechirp.original_id)
            isRechirped = retweetedChirps.includes(chirp.rechirp.original_id)
        } else {
            isLiked = likedChirps.includes(chirp._id)
            isRechirped = retweetedChirps.includes(chirp._id)
        }
        return { ...chirp, isLiked, isRechirped }
    })
}

const useFeed = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state)
    return [state, dispatch]
}

export default useFeed