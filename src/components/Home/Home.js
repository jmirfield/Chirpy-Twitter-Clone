import React, { useEffect, useContext } from 'react'
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
            const {feed, likedChirps, retweetedChirps} = await response.json()
            props.onGetFeed(feed, likedChirps, retweetedChirps)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        document.title = 'Home / Chirpy'
        if(props.chirps.length > 0)props.onClearFeed()
        getMainChirpFeed()
    }, [])

    return (
        <>
            <div className={classes['home__title']}>
                <h1>Home</h1>
            </div>
            <div className={classes['home__new-chirp']}>
                <NewChirp onNewChirp={props.onNewChirp}isModal={false} />
            </div>
            <div className={classes['home__chirps']}>
                {props.chirps.length > 0 ? <Chirps chirps={props.chirps} onDelete={props.onDeleteChirp} onRechirp={props.onNewChirp}/> : <p className={classes['home__chirps-none']}>No chirps available...</p>}
            </div>
        </>
    )
}

export default Home
