import {
    getUserProfile,
    getUserProfileFeed,
    getUserMedia,
    getUserLikes,
    followUser,
    unfollowUser,
    getUserFollowings,
    getUserFollowers,
    uploadImage,
    uploadBanner,
    getListOfUsers,
    getRecommendedFollowers
} from "../api/request"

export const getUserProfileRequest = async (user, dispatch) => {
    try {
        const { data } = await getUserProfile(user)
        const {
            _id,
            username,
            profileImage,
            bannerImage,
            isFollowing,
            followingCount,
            followerCount,
            chirpCount,
            likes } = data
        dispatch({
            type: 'PROFILE_READ',
            payload: {
                _id,
                username,
                profileImage,
                bannerImage,
                isFollow: isFollowing,
                followingCount: followingCount || 0,
                followerCount: followerCount || 0,
                chirpCount: chirpCount,
                likes
            }
        })
    } catch (e) {
        dispatch({ type: 'ERROR' })
    }
}

export const getUserProfileFeedRequest = async (options, query, dispatch) => {
    try {
        const { data } = await getUserProfileFeed(options.profile._id, query)
        const {
            feed,
            likedChirps,
            retweetedChirps
        } = data
        const chirps = feed.map((chirp) => {
            return {
                ...chirp,
                owner: {
                    username: options.profile.username,
                    profileImage: options.profile.profileImage
                }
            }
        })
        dispatch({
            type: 'GET_FEED',
            payload: {
                feed: chirps,
                liked: likedChirps,
                rechirped: retweetedChirps,
                myProfile: options.profile.username === options.user
            }
        })
    } catch (e) {
        dispatch({ type: 'ERROR' })
    }
}

export const getUserProfileMediaRequest = async (options, query, dispatch) => {
    try {
        const { data } = await getUserMedia(options._id, query)
        const {
            feed,
            likedChirps,
            retweetedChirps
        } = data
        const chirps = feed.map((chirp) => {
            return {
                ...chirp,
                owner: {
                    username: options.username,
                    profileImage: options.profileImage
                }
            }
        })
        dispatch({
            type: 'GET_FEED',
            payload: {
                feed: chirps,
                liked: likedChirps,
                rechirped: retweetedChirps,
                isStatic: true
            }
        })
    } catch (e) {
        dispatch({ type: 'ERROR' })
    }
}

export const getUserLikesRequest = async (likes, query, dispatch) => {
    try {
        const { data } = await getUserLikes(likes, query)
        const {
            feed,
            likedChirps,
            retweetedChirps
        } = data
        dispatch({
            type: 'GET_FEED',
            payload: {
                feed,
                liked: likedChirps,
                rechirped: retweetedChirps,
                isStatic: true
            }
        })
    } catch (e) {
        console.log(e)
        dispatch({ type: 'ERROR' })
    }
}

export const followRequest = async (_id, dispatch) => {
    try {
        await followUser({ _id })
        dispatch({ type: 'FOLLOW' })
    } catch (e) {
        console.log(e)
    }
}

export const unfollowRequest = async (_id, dispatch) => {
    try {
        await unfollowUser({ _id })
        dispatch({ type: 'UNFOLLOW' })
    } catch (e) {
        console.log(e)
    }
}

export const getUserFollowingsRequest = async (user, cb) => {
    try {
        const { data } = await getUserFollowings(user)
        cb(data)
    } catch (e) {
        console.log(e)
    }
}


export const getUserFollowersRequest = async (user, cb) => {
    try {
        const { data } = await getUserFollowers(user)
        cb(data)
    } catch (e) {
        console.log(e)
    }
}

export const uploadProfileImageRequest = async (img, cb) => {
    try {
        const { data } = await uploadImage(img)
        cb(data)
    } catch (e) {
        console.log(e)
    }
}

export const uploadProfileBannerRequest = async (img, cb) => {
    try {
        const { data } = await uploadBanner(img)
        cb(data)
    } catch (e) {
        console.log(e)
    }
}

export const getListOfUsersRequest = async (search, cb) => {
    try {
        const { data } = await getListOfUsers(search)
        cb(data)
    } catch (e) {
        console.log(e)
    }
}

export const getRecommendedFollowersRequest = async (cb) => {
    try {
        const { data } = await getRecommendedFollowers()
        cb(data)
    } catch (e) {
        console.log(e)
    }
}