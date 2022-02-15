import { useReducer } from 'react'

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
        case 'NEW_CHIRP':
            return {
                ...state,
                feed: [action.payload, ...state.feed]
            }
        case 'ADD_RECHIRP':
            return {
                ...state,
                feed: syncRechirps(
                    [action.payload.chirp, ...state.feed],
                    action.payload.id,
                    action.payload.rechirps
                )
            }
        case 'REMOVE_RECHIRP':
            const feed = state.feed.filter(chirp => {
                if (!chirp.rechirp) return true
                return chirp.rechirp.original_id !== action.payload.id
                    || action.payload.user !== chirp.owner_username
            })
            return {
                ...state,
                feed: syncRechirps(
                    feed,
                    action.payload.id,
                    action.payload.rechirps
                )
            }
        case 'LIKE':
            return {
                ...state,
                feed: syncLikes(
                    state.feed,
                    action.payload.id,
                    action.payload.likes
                )
            }
        case 'UNLIKE':
            return {
                ...state,
                feed: syncLikes(
                    state.feed,
                    action.payload.id,
                    action.payload.likes
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

const syncLikes = (feed, id, count) => {
    return feed.map(chirp => {
        if (chirp.rechirp) {
            if (chirp.rechirp.original_id === id) {
                chirp.isLiked = !chirp.isLiked
                chirp.likesCount = count
                return chirp
            }
        }
        if (chirp._id === id) {
            chirp.isLiked = !chirp.isLiked
            chirp.likesCount = count
            return chirp
        }
        return chirp
    })
}

const syncRechirps = (feed, id, count) => {
    return feed.map(chirp => {
        if (chirp.rechirp) {
            if (chirp.rechirp.original_id === id) {
                chirp.isRechirped = !chirp.isRechirped
                chirp.rechirpsCount = count
                return chirp
            }
        }
        if (chirp._id === id) {
            chirp.isRechirped = !chirp.isRechirped
            chirp.rechirpsCount = count
            return chirp
        }
        return chirp
    })
}

const useFeed = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return [state, dispatch]
}

export default useFeed