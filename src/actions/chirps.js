import {
    getMainFeed,
    newChirp,
    likeChirp,
    unLikeChirp,
    addRechirp,
    deleteRechirp
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
        const { data } = await newChirp({ content })
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

export const likeChirpRequest = async (dispatch, id, isChirpLiked, likes, rechirp) => {
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

export const onRechirpRequest = async (dispatch, id, message, timestamp, isChirpRechirped, isChirpLiked, rechirps, rechirp, user) => {
    if (!isChirpRechirped) {
        try {
            const req = !rechirp ? {
                content: message,
                rechirp: {
                    original_id: id,
                    original_owner: user,
                    original_time: timestamp
                }
            } : {
                content: message,
                rechirp: {
                    original_id: rechirp.original_id,
                    original_owner: rechirp.original_owner,
                    original_time: rechirp.original_time
                }
            }
            const { data } = await addRechirp(req)
            const { chirp } = data
            dispatch({
                type: 'ADD_RECHIRP',
                payload: {
                    chirp: {
                        ...chirp,
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
                    user: user,
                    rechirps: rechirps - 1
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
}
