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
    uploadBanner
} from "../api/request"

export const getUserProfileRequest = async (user, dispatch) => {
    try {
        const { data } = await getUserProfile(user)
        const { id,
            pic,
            banner,
            isFollowing,
            followingCount,
            followerCount,
            chirpCount,
            likes } = data
        dispatch({
            type: 'PROFILE_READ',
            payload: {
                id,
                pic,
                banner,
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

export const getUserProfileFeedRequest = async (user, dispatch, myProfile) => {
    try {
        const { data } = await getUserProfileFeed(user)
        const {
            feed,
            likedChirps,
            retweetedChirps
        } = data
        dispatch({
            type: 'INIT_SYNC',
            payload: {
                feed,
                liked: likedChirps,
                rechirped: retweetedChirps,
                myProfile
            }
        })
    } catch (e) {
        console.log(e)
        dispatch({ type: 'ERROR' })
    }
}

export const getUserProfileMediaRequest = async (user, dispatch) => {
    try {
        const { data } = await getUserMedia(user)
        const {
            feed,
            likedChirps,
            retweetedChirps
        } = data
        dispatch({
            type: 'INIT_SYNC',
            payload: {
                feed,
                liked: likedChirps,
                rechirped: retweetedChirps
            }
        })
    } catch (e) {
        console.log(e)
        dispatch({ type: 'ERROR' })
    }
}

export const getUserLikesRequest = async (likes, dipsatch) => {
    try {
        const { data } = await getUserLikes(likes)
        const {
            feed,
            likedChirps,
            retweetedChirps
        } = data
        dipsatch({
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
        dipsatch({ type: 'ERROR' })
    }
}

export const followRequest = async (id, dispatch) => {
    try {
        await followUser({ id })
        dispatch({ type: 'FOLLOW' })
    } catch (e) {
        console.log(e)
    }
}

export const unfollowRequest = async (id, dispatch) => {
    try {
        await unfollowUser({ id })
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