import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import useFeed from '../../hooks/useFeed'
import NewChirp from '../Chirps/NewChirp'
import ChirpList from '../Chirps/ChirpList'
import { getChirpReplies } from '../../actions/chirps'

const StatusReplies = () => {
    const main = useOutletContext()
    const { chirpId } = useParams()
    const [reply, replyDispatch] = useFeed(getChirpReplies.bind(this, chirpId))

    return (
        <>
            <NewChirp
                isReply={true}
                owner={main.feed[0].owner}
                _id={main.feed[0]._id}
                dispatch={replyDispatch}
                isModal={false}
            />
            <ChirpList
                chirps={reply.feed}
                dispatch={replyDispatch}
                error={reply.error}
                isLoading={reply.isLoading}
                thread={main.feed[0].owner.username}
            />
        </>
    )
}

export default StatusReplies