import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { getChirpStatus } from '../../actions/chirps'
import useFeed from '../../hooks/useFeed'
import Header from '../UI/Header/Header'
import Chirp from '../Chirps/Chirp'
import LoadingFeed from '../Loading/LoadingFeed'

const Status = () => {
    const { chirpId } = useParams()
    const [main, mainDispatch] = useFeed(getChirpStatus.bind(this, chirpId))

    useEffect(() => {
        if (main.feed.length !== 0) mainDispatch({ type: "RESET" })
    }, [chirpId])

    if (!main || main.isLoading) {
        return (
            <>
                <Header backButton={true}>
                    <h3>Thread</h3>
                </Header>
                <LoadingFeed height={30} width={30} />
            </>
        )
    }

    if (main.error) {
        return (
            <>
                <Header backButton={true}>
                    <h3>Thread</h3>
                </Header>
                <h2>Original tweet has been deleted</h2>
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
            <Outlet context={main} />
        </>
    )
}

export default Status