import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getChirpStatus, getChirpReplies } from '../../actions/chirps'
import useFeed from '../../hooks/useFeed'
import Header from '../UI/Header/Header'
import Chirp from '../Chirps/Chirp'
import LoadingFeed from '../Loading/LoadingFeed'
import NewChirp from '../Chirps/NewChirp'
import ChirpList from '../Chirps/ChirpList'
import styles from './styles.module.css'

const Status = () => {
    const [main, mainDispatch] = useFeed()
    const [reply, replyDispatch] = useFeed()
    const { chirpId } = useParams()

    useEffect(() => {
        getChirpStatus(chirpId, mainDispatch)
        getChirpReplies(chirpId, replyDispatch)
        return () => {
            mainDispatch({ type: 'RESET' })
            replyDispatch({ type: 'RESET' })
        }
    }, [chirpId])

    if (main.isLoading) {
        return (
            <>
                <Header backButton={true}>
                    <h3>Thread</h3>
                </Header>
                <LoadingFeed height={30} width={30} />
            </>
        )
    }

    return (
        <>
            <Header backButton={true}>
                <h3>Thread</h3>
            </Header>
            <Chirp
                _id={main.feed[0]._id}
                owner={main.feed[0].owner}
                content={main.feed[0].content}
                repliesCount={main.feed[0].repliesCount}
                rechirpsCount={main.feed[0].rechirpsCount}
                isRechirped={main.feed[0].isRechirped}
                likesCount={main.feed[0].likesCount}
                isLiked={main.feed[0].isLiked}
                createdAt={main.feed[0].createdAt}
                rechirp={null}
                imageURL={main.feed[0].imageURL}
                dispatch={mainDispatch}
            />
            <NewChirp
                isReply={true}
                owner={main.feed[0].owner}
                _id={main.feed[0]._id}
                dispatch={replyDispatch}
                isModal={false}
            />
            {reply.feed.length > 0 &&
                <ChirpList
                    chirps={reply.feed}
                    dispatch={replyDispatch}
                    error={reply.error}
                    isLoading={reply.isLoading}
                />
            }
        </>
    )
}

export default Status