import React from 'react'
import formatDate from '../../helpers/formatDate'
import Tweet from './Tweet'
import Card from '../UI/Card/Card'
import classes from './Tweets.module.css'


const DUMMY_TWEETS = [
    {
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus at urna condimentum mattis pellentesque id nibh tortor. Nec ullamcorper sit amet risus nullam eget.',
        user: 'TestUser',
        timestamp: formatDate(),
        id: 't1'
    },
    {
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet.',
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
    },
    {
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu odio ut sem nulla.',
        user: 'TestUser',
        timestamp: formatDate(),
        id: 't6'
    },
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
