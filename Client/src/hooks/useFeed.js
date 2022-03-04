import { useReducer } from 'react'

const initialState = {
    feed: [],
    isLoading: true,
    myProfile: undefined,
    isLikePage: undefined,
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
                isLoading: false,
                error: null,
                myProfile: action.payload.myProfile,
                isLikePage: action.payload.isLikePage
            }
        case 'NEW_CHIRP':
            return {
                ...state,
                feed: [
                    {
                        ...action.payload.chirp,
                        owner: {
                            username: action.payload.client.user,
                            profileImage: action.payload.client.profileImage
                        }
                    },
                    ...state.feed
                ]
            }
        case 'ADD_RECHIRP':
            if ((state.myProfile || state.myProfile === undefined) && !state.isLikePage) {
                return {
                    ...state,
                    feed: syncRechirps(
                        [action.payload.chirp, ...state.feed],
                        action.payload._id,
                        action.payload.rechirpsCount
                    )
                }
            }
        case 'REMOVE_RECHIRP':
            const feed = state.feed.filter(chirp => {
                if (!chirp.rechirp) return true
                return chirp.rechirp._id !== action.payload._id
                    || action.payload.user !== chirp.owner.username
            })
            return {
                ...state,
                feed: syncRechirps(
                    feed,
                    action.payload._id,
                    action.payload.rechirpsCount
                )
            }
        case 'LIKE':
            return {
                ...state,
                feed: syncLikes(
                    state.feed,
                    action.payload.id,
                    action.payload.likesCount
                )
            }
        case 'UNLIKE':
            return {
                ...state,
                feed: syncLikes(
                    state.feed,
                    action.payload.id,
                    action.payload.likesCount
                )
            }
        case 'ERROR':
            return {
                feed: [],
                isLoading: false,
                error: true
            }
        case 'RESET':
            return {
                feed: [],
                isLoading: true,
                myProfile: undefined,
                error: null
            }
    }
}


const syncFeed = (feed, likedChirps, retweetedChirps) => {
    return feed.map(chirp => {
        let isLiked = false;
        let isRechirped = false;
        if (chirp.rechirp) {
            isLiked = likedChirps.includes(chirp.rechirp._id)
            isRechirped = retweetedChirps.includes(chirp.rechirp._id)
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
            if (chirp.rechirp._id === id) {
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
            if (chirp.rechirp._id === id) {
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
    // console.log(state.feed)
    return [state, dispatch]
}

export default useFeed