export const initialState = {
    feed: [],
    query: 'init',
    isLoading: true,
    myProfile: undefined,
    isStatic: undefined,
    error: null
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

export const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_FEED':
            return {
                ...state,
                feed: state.feed.concat(syncFeed(
                    action.payload.feed,
                    action.payload.liked,
                    action.payload.rechirped
                )),
                isLoading: false,
                error: null,
                myProfile: action.payload.myProfile,
                isStatic: action.payload.isStatic
            }
        case 'GET_SINGLE':
            return {
                ...state,
                feed: state.feed.concat(syncFeed(
                    action.payload.feed,
                    action.payload.liked,
                    action.payload.rechirped
                )),
                isLoading: false,
                error: null,
                myProfile: action.payload.myProfile,
                isStatic: action.payload.isStatic,
                query: action.payload.query
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
        case 'DELETE_CHIRP':
            return {
                ...state,
                feed: state.feed.filter(chirp => chirp._id !== action.payload)
            }
        case 'ADD_RECHIRP':
            if ((state.myProfile || state.myProfile === undefined) && !state.isStatic) {
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
            return {
                ...state,
                feed: syncRechirps(
                    state.feed.filter(chirp => {
                        if (!chirp.rechirp) return true
                        return chirp.rechirp._id !== action.payload._id
                            || action.payload.user !== chirp.owner.username
                    }),
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
                ...state,
                feed: [],
                isLoading: false,
                error: true
            }
        case 'LOAD_MORE':
            if (state?.feed.length > 0) {
                return {
                    ...state,
                    query: state?.feed[state.feed.length - 1]?.createdAt
                }
            }
        case 'RESET':
            return {
                feed: [],
                query: 'init',
                isLoading: true,
                myProfile: undefined,
                isStatic: undefined,
                error: null
            }
        default:
            return state
    }
}