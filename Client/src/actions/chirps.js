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

export const newChirpRequest = async (content, { dispatch, isModal, onClose }, { user, profileImage }) => {
    try {
        if(isModal)onClose()
        const { data } = await newChirp({ content, imageURL: '' })
        if (isModal) {
            window.location.reload(false)
            //Will need to be fixed to update feed on home and profile when using menubar chirp buton
            return
        }
        // console.log(data)
        dispatch({
            type: 'NEW_CHIRP',
            payload: {
                chirp: {
                    ...data,
                    isLiked: false,
                    isRechirped: false
                },
                client: { user, profileImage }
            }
        })
    } catch (e) {
        console.log('Error with chirp request')
    }
}

export const newChirpRequestWithImage = async (content, { dispatch, isModal, onClose }, { user, profileImage }) => {
    try {
        if(isModal)onClose()
        const { data } = await newChirpWithImage(content)
        if (isModal) {
            window.location.reload(false)
            //Will need to be fixed to update feed on home and profile when using menubar chirp buton
            return
        }
        // console.log(data)
        dispatch({
            type: 'NEW_CHIRP',
            payload: {
                chirp: {
                    ...data,
                    isLiked: false,
                    isRechirped: false
                },
                client: { user, profileImage }
            }
        })
    } catch (e) {
        console.log('Error with chirp request')
    }
}

export const likeChirpRequest = async ({ dispatch, _id, isLiked, likesCount, rechirp }) => {
    const req = !rechirp ? _id : rechirp._id
    if (!isLiked) {
        try {
            await likeChirp({ _id: req })
            dispatch({
                type: 'LIKE',
                payload: {
                    id: req,
                    likesCount: likesCount + 1
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
                    likesCount: likesCount - 1
                }
            })
        } catch (e) {
            console.log('Error with liking')
        }
    }
}

export const onRechirpRequest = async (chirp, client) => {
    const {
        isLiked,
        isRechirped,
        rechirpsCount,
        rechirp,
        content,
        imageURL = '',
        dispatch
    } = chirp
    if (!isRechirped) {
        try {
            const createdAt = !rechirp ? chirp.createdAt : chirp.rechirp.createdAt
            const _id = !rechirp ? chirp._id : chirp.rechirp._id
            const owner = !rechirp ? chirp.owner : chirp.rechirp.owner
            const req = { content, imageURL, rechirp: _id }
            const { data } = await addRechirp(req)

            dispatch({
                type: 'ADD_RECHIRP',
                payload: {
                    chirp: {
                        ...data,
                        owner: { username: client },
                        rechirp: { createdAt, owner, _id },
                        isLiked,
                        isRechirped
                    },
                    _id: data.rechirp,
                    rechirpsCount: rechirpsCount + 1
                }
            })
        } catch (e) {
            console.log('Error with rechirping')
            console.log(e)
        }
    } else {
        try {
            const req = !rechirp ? chirp._id : rechirp._id
            await deleteRechirp({ _id: req })
            dispatch({
                type: 'REMOVE_RECHIRP',
                payload: {
                    _id: req,
                    user: client,
                    rechirpsCount: rechirpsCount - 1
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
}
