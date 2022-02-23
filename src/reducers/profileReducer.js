export const initialState = {
    id: '',
    pic: null,
    banner: null,
    isFollow: false,
    followerCount: 0,
    followingCount: 0,
    chirpCount: 0,
    likes: [],
    isLoading: true,
    error: false
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'PROFILE_READ':
            return {
                ...state,
                id: action.payload.id,
                pic: action.payload.pic,
                banner: action.payload.banner,
                isFollow: action.payload.isFollow,
                followerCount: action.payload.followerCount,
                followingCount: action.payload.followingCount,
                chirpCount: action.payload.chirpCount,
                likes: action.payload.likes,
                isLoading: false
            }
        case 'FOLLOW':
            return {
                ...state,
                followerCount: state.followerCount + 1,
                isFollow: true
            }
        case 'UNFOLLOW':
            return {
                ...state,
                followerCount: state.followerCount - 1,
                isFollow: false
            }
        case 'CHANGE_USER':
            return {
                ...state,
                id: '',
                isFollow: false,
                followerCount: 0,
                followingCount: 0,
                chirpCount: 0,
                likes: [],
                isLoading: true,
                error: false
            }
        case 'ERROR':
            return {
                ...state,
                isLoading: false,
                error: true
            }
        default:
            return state
    }
}
