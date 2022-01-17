import React from 'react'
import Button from '../UI/Button/Button'
import TweetInput from '../UI/TweetInput/TweetInput'
import classes from './NewTweet.module.css'

const NewTweet = () => {
    return (
        <div className={classes.main}>
            <div className={classes.profileIcon}>
                {/* TEMP */}
            </div>
            <div className={classes.input}>
                <TweetInput />
            </div>
        </div>
    )
}

export default NewTweet
