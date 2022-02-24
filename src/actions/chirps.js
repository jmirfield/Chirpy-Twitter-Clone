import {
    getMainFeed,
    newChirp,
    likeChirp,
    unLikeChirp,
    addRechirp,
    deleteRechirp,
    newChirpWithImage
} from "../api/request"

export const getMainChirpFeed = async (dispatch) => {
    try {
        const { data } = await getMainFeed()
        const { feed, likedChirps, retweetedChirps } = data
        dispatch({
            type: 'INIT_SYNC',
            payload: {
                feed,
                liked: likedChirps,
                rechirped: retweetedChirps
            }
        })
    } catch (e) {
        dispatch({ type: 'ERROR' })
    }
}

export const newChirpRequest = async (content, onNewChirp, isModal, onClose) => {
    try {
        const { data } = await newChirp({ content, imageURL: '' })
        if (isModal) {
            onClose()
            window.location.reload(false)
            //Will need to be fixed to update feed on home and profile when using menubar chirp buton
            return
        }
        onNewChirp({ ...data, isLiked: false, isRechirped: false })
    } catch (e) {
        console.log('Error with chirp request')
    }
}

export const newChirpRequestWithImage = async (content, onNewChirp, isModal, onClose) => {
    try {
        const { data } = await newChirpWithImage(content)
        if (isModal) {
            onClose()
            window.location.reload(false)
            //Will need to be fixed to update feed on home and profile when using menubar chirp buton
            return
        }
        onNewChirp({ ...data, isLiked: false, isRechirped: false })
    } catch (e) {
        console.log('Error with chirp request')
    }
}

export const likeChirpRequest = async ({dispatch, id, isChirpLiked, likes, rechirp}) => {
    const req = !rechirp ? id : rechirp.original_id
    if (!isChirpLiked) {
        try {
            await likeChirp({ _id: req })
            dispatch({
                type: 'LIKE',
                payload: {
                    id: req,
                    likes: likes + 1
                }
            })
        } catch (e) {
            console.log('Error with liking')
        }
    } else {
        try {
            await unLikeChirp({ _id: req })
            dispatch({
                type: 'UNLIKE',
                payload: {
                    id: req,
                    likes: likes - 1
                }
            })
        } catch (e) {
            console.log('Error with liking')
        }
    }
}

export const onRechirpRequest = async ({dispatch, id, message, timestamp, imageURL = null, image, isChirpRechirped, isChirpLiked, rechirps, rechirp, user}, client) => {
    if (!isChirpRechirped) {
        try {
            const req = !rechirp ? {
                content: message,
                rechirp: {
                    original_id: id,
                    original_owner: user,
                    original_time: timestamp,
                    original_image: image
                }
            } : {
                content: message,
                rechirp: {
                    original_id: rechirp.original_id,
                    original_owner: rechirp.original_owner,
                    original_time: rechirp.original_time,
                    original_image: rechirp.original_image
                }
            }
            const { data } = await addRechirp({...req, imageURL})
            const { chirp } = data
            dispatch({
                type: 'ADD_RECHIRP',
                payload: {
                    chirp: {
                        ...chirp,
                        user: chirp.rechirp.original_image, //Need to find better solution
                        isLiked: isChirpLiked,
                        isRechirped: isChirpRechirped
                    },
                    id: req.rechirp.original_id,
                    rechirps: rechirps + 1
                }
            })
        } catch (e) {
            console.log('Error with rechirping')
        }
    } else {
        try {
            const req = !rechirp ? id : rechirp.original_id
            await deleteRechirp({ _id: req })
            dispatch({
                type: 'REMOVE_RECHIRP',
                payload: {
                    id: req,
                    user: client,
                    rechirps: rechirps - 1
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
}