import React from 'react'
import formatDate from '../../helpers/formatDate'
import Tweet from './Tweet'
import Card from '../UI/Card/Card'
import classes from './Tweets.module.css'


const DUMMY_TWEETS = [
    {
        message: 'Hello world',
        user: 'TestUser',
        timestamp: formatDate(),
        id: 't1'
    },
    {
        message: 'This is my second tweet',
        user: 'TestUser',
        timestamp: formatDate(),
        id: 't2'
    },
    {
        message: 'Testing testing testing',
        user: 'TestUser',
        timestamp: formatDate(),
        id: 't3'
    },
    {
        message: 'Yessir yessir',
        user: 'TestUser',
        timestamp: formatDate(),
        id: 't4'
    },
    {
        message: 'No.',
        user: 'TestUser',
        timestamp: formatDate(),
        id: 't5'
    }
]

const Tweets = () => {
    return (
        <Card>
            <div className={classes.tweets}>
                {DUMMY_TWEETS.map(({ id, user, message, timestamp }) => {
                    return (
                        <Tweet
                            key={id}
                            user={user}
                            message={message}
                            timestamp={timestamp}
                        />
                    )
                })}
            </div>
        </Card>
    )
}

export default Tweets
