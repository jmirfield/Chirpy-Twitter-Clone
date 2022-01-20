import React, { useState, useEffect } from 'react'
import NewChirp from '../Chirps/NewChirp'
import Chirps from '../Chirps/Chirps'
import classes from './Home.module.css'

const Home = () => {

    const [chirps, setChirps] = useState([])

    const getChirpFeed = async() => {
        try {
            const response = await fetch("http://localhost:3001/chirps/feed", {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            })
            const feed = await response.json()
            setChirps(feed)
        } catch (e) {
            console.log('ERROR')
        }
    }

    useEffect(() => {
        document.title = 'Home / Chirpy'
        getChirpFeed()
    }, [])

    const addChirpTestHandler = (chirp) => {
        setChirps(prevChirps => [chirp,...prevChirps])
    }

    return (
        <>
            <div className={classes.title}>
                <h1>Home</h1>
            </div>
            <div className={classes.newChirp}>
                <NewChirp onAdd={addChirpTestHandler}/>
            </div>
            <Chirps chirps={chirps}/>
        </>
    )
}

export default Home
