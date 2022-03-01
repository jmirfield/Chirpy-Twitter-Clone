import React, { useEffect } from 'react'
import useFeed from '../../hooks/useFeed'
import { getMainChirpFeed } from '../../actions/chirps'
import NewChirp from '../Chirps/NewChirp'
import ChirpList from '../Chirps/ChirpList'
import styles from './Home.module.css'

const Home = () => {
    const [{ feed, isLoading, error }, feedDispatch] = useFeed()

    useEffect(() => {
        document.title = 'Home / Chirpy'
        window.scrollTo(0, 0);
        getMainChirpFeed(feedDispatch)
        const onScroll = function () { //Can be used for pagination
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                //   console.log("you're at the bottom of the page")
            }
        }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            <header className={styles['home__header']}>
                <h2>Home</h2>
            </header>
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
