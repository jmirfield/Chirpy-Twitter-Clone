import React, { useEffect } from 'react'
import { getMainFeed } from '../../api/request'
import useFeed from '../../hooks/useFeed'
import NewChirp from '../Chirps/NewChirp'
import ChirpList from '../Chirps/ChirpList'
import classes from './Home.module.css'

const Home = () => {
    const [{ feed, isLoading, error }, feedDispatch] = useFeed()

    const getMainChirpFeed = async () => {
        try {
            const {
                feed,
                likedChirps,
                retweetedChirps
            } = await getMainFeed()
            feedDispatch({
                type: 'INIT_SYNC',
                payload: {
                    feed,
                    liked: likedChirps,
                    rechirped: retweetedChirps
                }
            })
        } catch (e) {
            feedDispatch({ type: 'ERROR' })
        }
    }

    const newChirpHandler = (chirp) => {
        feedDispatch({
            type: 'NEW_CHIRP',
            payload: chirp
        })
    }

    useEffect(() => {
        document.title = 'Home / Chirpy'
        window.scrollTo(0, 0);
        getMainChirpFeed()
    }, [])

    return (
        <>
            <header className={classes['home__header']}>
                <h2>Home</h2>
            </header>
            <NewChirp
                onNewChirp={newChirpHandler}
                isModal={false}
                className={classes['home__new-chirp']}
            />
            <ChirpList
                chirps={feed}
                dispatch={feedDispatch}
                error={error}
                isLoading={isLoading}
            />
        </>
    )
}

export default Home
