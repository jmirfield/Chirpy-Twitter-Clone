import React, { useEffect } from 'react'
import useFeed from '../../hooks/useFeed'
import { getMainChirpFeed } from '../../actions/chirps'
import NewChirp from '../Chirps/NewChirp'
import ChirpList from '../Chirps/ChirpList'
import styles from './Home.module.css'

const Home = () => {
    const [{ feed, isLoading, error }, feedDispatch] = useFeed()

    const newChirpHandler = (chirp) => {
        feedDispatch({
            type: 'NEW_CHIRP',
            payload: chirp
        })
    }

    useEffect(() => {
        document.title = 'Home / Chirpy'
        window.scrollTo(0, 0);
        getMainChirpFeed(feedDispatch)
    }, [])

    return (
        <>
            <header className={styles['home__header']}>
                <h2>Home</h2>
            </header>
            <NewChirp
                onNewChirp={newChirpHandler}
                isModal={false}
                className={styles['home__new-chirp']}
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
