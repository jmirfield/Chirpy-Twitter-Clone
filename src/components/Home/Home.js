import React, { useEffect, useContext } from 'react'
import NewChirp from '../Chirps/NewChirp'
import Chirps from '../Chirps/Chirps'
import classes from './Home.module.css'
import MainContext from '../../context/MainContext'

const Home = () => {

    const ctx = useContext(MainContext)
    const getChirpFeed = async () => {
        try {
            const response = await fetch("http://localhost:3001/chirps/feed", {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            })
            const {feed, likedChirps} = await response.json()
            ctx.onGetFeed(feed, likedChirps)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        document.title = 'Home / Chirpy'
        getChirpFeed()
    }, [])

    return (
        <>
            <div className={classes['home__title']}>
                <h1>Home</h1>
            </div>
            <div className={classes['home__new-chirp']}>
                <NewChirp onAdd={ctx.onAddChirp} isModal={false} />
            </div>
            <div className={classes['home__chirps']}>
                {ctx.chirps.length > 0 ? <Chirps chirps={ctx.chirps} /> : <p className={classes['home__chirps-none']}>No chirps available...</p>}
            </div>
        </>
    )
}

export default Home
