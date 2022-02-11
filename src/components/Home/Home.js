import React, { useEffect } from 'react'
import NewChirp from '../Chirps/NewChirp'
import Chirps from '../Chirps/Chirps'
import classes from './Home.module.css'

const Home = (props) => {

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
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        document.title = 'Home / Chirpy'
        window.scrollTo(0, 0);
        if (props.chirps.length > 0) props.clearFeed()
        getMainChirpFeed()
    }, [])

    return (
        <>
            <header className={classes['home__header']}>
                <h2>Home</h2>
            </header>
            <section className={classes['home__new-chirp']}>
                <NewChirp onNewChirp={props.onNewChirp} isModal={false} />
            </section>
            <section className={classes['home__chirps']}>
                {props.chirps.length > 0
                    ? <Chirps
                        chirps={props.chirps}
                        onDeleteRechirp={props.onDeleteRechirp}
                        onRechirp={props.onNewChirp}
                        syncFeed={props.syncFeed}
                    />
                    : <p className={classes['home__chirps-none']}>No chirps available...</p>}
            </section>
        </>
    )
}

export default Home
