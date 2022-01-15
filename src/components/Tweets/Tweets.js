import React from 'react'
import formatDate from '../../helpers/formatDate'
import classes from './Tweets.module.css'

const DUMMY_TWEETS = [
    {
        message: 'Hello world',
        user: 'TestUser',
        timestamp: formatDate(),
        id: 't001'
    },
    {
        message: 'This is my second tweet',
        user: 'TestUser',
        timestamp: formatDate(),
        id: 't002'
    },
    {
        message: 'Testing testing testing',
        user: 'TestUser',
        timestamp: formatDate(),
        id: 't003'
    },
    {
        message: 'Yessir yessir',
        user: 'TestUser',
        timestamp: formatDate(),
        id: 't004'
    },
    {
        message: 'No.',
        user: 'TestUser',
        timestamp: formatDate(),
        id: 't005'
    }
]

const Tweets = () => {
    return (
        <div style={{ maxWidth: '25rem', margin: 'auto' }}>
            {DUMMY_TWEETS.map(({ message, user, timestamp, id }) => {
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
                                <button>Action1</button>
                                <button>Action2</button>
                                <button>Action3</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Tweets
