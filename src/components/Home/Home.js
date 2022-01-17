import React from 'react'
import NewTweet from '../Tweets/NewTweet'
import Tweets from '../Tweets/Tweets'
import classes from './Home.module.css'

const Home = () => {
    return (
        <div className={classes.layout}>
            <div className={classes.sidebar}>

            </div>
            <div className={classes.main}>
                <NewTweet />
                <Tweets />
            </div>
            <div>

            </div>
        </div>
    )
}

export default Home
