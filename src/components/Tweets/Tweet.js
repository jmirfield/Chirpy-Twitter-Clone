import React from 'react'
import classes from './Tweet.module.css'

const Tweet = ({id, user, message, timestamp}) => {
    return (
        <div className={classes.tweet} key={id}>
            <span className={classes.tempIcon}></span>
            <div className={classes.tweetMain}>
                <div>
                    <span style={{ fontWeight: 'bold', marginRight: '2rem' }}>{user}</span>
                    <span className={classes.tweetTime}>{timestamp}</span>
                </div>
                <p className={classes.tweetMessage}>{message}</p>
                <div className={classes.tweetActions}>
                    <button>Reply</button>
                    <button>Rechirp</button>
                    <button>Like</button>
                </div>
            </div>
        </div>
    )
}

export default Tweet
