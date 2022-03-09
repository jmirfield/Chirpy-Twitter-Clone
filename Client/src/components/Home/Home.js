import React, { useEffect } from 'react'
import useFeed from '../../hooks/useFeed'
import { getMainChirpFeed } from '../../actions/chirps'
import NewChirp from '../Chirps/NewChirp'
import ChirpList from '../Chirps/ChirpList'
import styles from './Home.module.css'
import Header from '../UI/Header/Header'

const Home = () => {
    const [{ feed, isLoading, error }, feedDispatch] = useFeed(getMainChirpFeed)

    useEffect(() => {
        document.title = 'Home / Chirpy'
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Header>
                <h2>Home</h2>
            </Header>
            <NewChirp
                dispatch={feedDispatch}
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
