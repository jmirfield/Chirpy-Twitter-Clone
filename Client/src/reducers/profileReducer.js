export const initialState = {
    _id: '',
    username: '',
    profileImage: null,
    bannerImage: null,
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
                _id: action.payload._id,
                username: action.payload.username,
                profileImage: action.payload.profileImage,
                bannerImage: action.payload.bannerImage,
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
                _id: '',
                username: '',
                profileImage: null,
                bannerImage: null,
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
