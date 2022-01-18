import React, { useEffect } from 'react'
import NewTweet from '../Tweets/NewTweet'
import Tweets from '../Tweets/Tweets'
import classes from './Home.module.css'

const Home = () => {

    useEffect(() => {
        document.title = 'Home / Chirpy'
    }, [])

    return (
        <>
            <div className={classes.title}>
                <h1>Home</h1>
            </div>
            <div className={classes.newTweet}>
                <div className={classes.profileIcon} />
                <NewTweet />
            </div>
            <Tweets />
        </>
    )
}

export default Home
