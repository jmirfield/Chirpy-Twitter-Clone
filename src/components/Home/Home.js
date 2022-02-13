import React, { useEffect, useState } from 'react'
import NewChirp from '../Chirps/NewChirp'
import Chirps from '../Chirps/Chirps'
import LoadingFeed from '../Loading/LoadingFeed'
import classes from './Home.module.css'

const Home = (props) => {

    const [isLoading, setIsLoading] = useState(true)

    const getMainChirpFeed = async () => {
        try {
            const response = await fetch("http://localhost:3001/chirps/feed", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            })
            const { feed, likedChirps, retweetedChirps } = await response.json()
            props.onGetFeed(feed, likedChirps, retweetedChirps)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            console.log(e.message)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        document.title = 'Home / Chirpy'
        window.scrollTo(0, 0);
        if (props.chirps.length > 0) props.clearFeed()
        getMainChirpFeed()
    }, [])

    if (isLoading) {
        return (
            <LoadingFeed />
        )
    }

    return (
        <>
            <header className={classes['home__header']}>
                <h2>Home</h2>
            </header>
            <NewChirp
                onNewChirp={props.onNewChirp}
                isModal={false}
                className={classes['home__new-chirp']}
            />
            {props.chirps.length > 0
                ? <Chirps
                    chirps={props.chirps}
                    onDeleteRechirp={props.onDeleteRechirp}
                    onRechirp={props.onNewChirp}
                    syncFeed={props.syncFeed}
                    className={classes['home__chirps']}
                />
                : <p className={classes['home__chirps-none']}>No chirps available...</p>}
        </>
    )
}

export default Home
