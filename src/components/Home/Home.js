import React from 'react'
import NewTweet from '../Tweets/NewTweet'
import Tweets from '../Tweets/Tweets'
import classes from './Home.module.css'

const Home = () => {
    return (
        <>
            <div className={classes.title}>
                <h1>Home</h1>
            </div>
            <NewTweet />
            <Tweets />
        </>
    )
}

export default Home
