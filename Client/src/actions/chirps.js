import {
    getMainFeed,
    getChirp,
    newChirp,
    newChirpWithImage,
    newReply,
    newReplyWithImage,
    getReplies,
    likeChirp,
    unLikeChirp,
    addRechirp,
    deleteRechirp,
    deleteChirp,
} from "../api/request"

export const getMainChirpFeed = async (query, dispatch) => {
    try {
        const { data } = await getMainFeed(query)
        const { feed, likedChirps, retweetedChirps } = data
        dispatch({
            type: 'GET_FEED',
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
        if (isModal) onClose()
        const { data } = await newChirp({ content, imageURL: '' })
        if (isModal) {
            window.location.reload(false)
            return
        }
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
        if (isModal) onClose()
        const { data } = await newChirpWithImage(content)
        if (isModal) {
            window.location.reload(false)
            return
        }
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

export const deleteChirpRequest = async ({ _id, dispatch }) => {
    try {
        await deleteChirp(_id)
        dispatch({
            type: 'DELETE_CHIRP',
            payload: _id
        })
    } catch (e) {
        console.log('Error with chirp request')
    }
}

export const replyRequest = async (content, { dispatch, isModal, onClose, _id }, { user, profileImage }) => {
    try {
        if (isModal) onClose()
        const { data } = await newReply({ content, imageURL: '', reply: _id })
        if (isModal) {
            window.location.reload(false)
            //Will need to be fixed to update feed on home and profile when using menubar chirp buton
            return
        }
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

export const replyRequestWithImage = async (content, { dispatch, isModal, onClose, _id }, { user, profileImage }) => {
    try {
        if (isModal) onClose()
        const { data } = await newReplyWithImage(content)
        if (isModal) {
            window.location.reload(false)
            //Will need to be fixed to update feed on home and profile when using menubar chirp buton
            return
        }
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

export const getChirpReplies = async (_id, query, dispatch) => {
    try {
        const { data } = await getReplies(_id, query)
        const { feed, likedChirps, retweetedChirps } = data
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
        dispatch({ type: 'ERROR' })
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
        reply,
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
            const repliesCount = !rechirp ? chirp.repliesCount : chirp.rechirp.repliesCount
            const req = { content, imageURL, rechirp: _id, reply }
            const { data } = await addRechirp(req)
            dispatch({
                type: 'ADD_RECHIRP',
                payload: {
                    chirp: {
                        ...data,
                        owner: { username: client },
                        rechirp: { createdAt, owner, _id, repliesCount },
                        isLiked,
                        isRechirped
                    },
                    _id: data.rechirp,
                    rechirpsCount: rechirpsCount + 1,
                }
            })
        } catch (e) {
            console.log('Error with rechirping')
            console.log(e)
        }
    } else {
        try {
            const req = !rechirp ? chirp._id : rechirp._id
            await deleteRechirp(req)
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

export const getChirpStatus = async (_id, query, dispatch) => {
    try {
        if (query === 'init') {
            const { data } = await getChirp(_id)
            const { feed, likedChirps, retweetedChirps } = data
            if (feed[0] !== null) {
                dispatch({
                    type: 'GET_SINGLE',
                    payload: {
                        feed,
                        liked: likedChirps,
                        rechirped: retweetedChirps,
                        isStatic: true,
                        query: undefined
                    }
                })
            } else {
                dispatch({ type: 'ERROR' })
            }
        }
    } catch (e) {
        console.log(e)
    }
}
