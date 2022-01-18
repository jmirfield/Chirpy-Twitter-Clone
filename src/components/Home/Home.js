import React, { useState, useEffect } from 'react'
import formatDate from '../../helpers/formatDate'
import NewTweet from '../Tweets/NewTweet'
import Tweets from '../Tweets/Tweets'
import classes from './Home.module.css'

const DUMMY_TWEETS = [
    {
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus at urna condimentum mattis pellentesque id nibh tortor. Nec ullamcorper sit amet risus nullam eget.',
        user: 'TestUser',
        stats: [10, 20, 30],
        timestamp: formatDate(),
        id: 't1'
    },
    {
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet.',
        user: 'TestUser',
        stats: [0, 0, 100],
        timestamp: formatDate(),
        id: 't2'
    },
    {
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu odio ut sem nulla.',
        user: 'TestUser',
        stats: [0, 1, 2],
        timestamp: formatDate(),
        id: 't3'
    },
]

const Home = () => {

    useEffect(() => {
        document.title = 'Home / Chirpy'
    }, [])

    const [tweets, setTweets] = useState(DUMMY_TWEETS)
    const addTweetTestHandler = (tweet) => {
        setTweets(prevTweets => [{
            message: tweet,
            user: 'TestUser123',
            stats: [0,0,0],
            timestamp: formatDate(),
            id: Math.random()
        },...prevTweets])
    }

    return (
        <>
            <div className={classes.title}>
                <h1>Home</h1>
            </div>
            <div className={classes.newTweet}>
                <NewTweet onAdd={addTweetTestHandler}/>
            </div>
            <Tweets tweets={tweets}/>
        </>
    )
}

export default Home
