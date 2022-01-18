import React from 'react'
import TweetIcons from './TweetIcons'
import classes from './Tweet.module.css'

const Tweet = React.memo(({ id, user, message, stats, timestamp }) => {
    // console.log('render')
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
                    <TweetIcons stats={stats} />
                </div>
            </div>
        </div>
    )
})

export default Tweet
