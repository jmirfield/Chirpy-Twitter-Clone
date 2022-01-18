import React from 'react'
import Tweet from './Tweet'
import Card from '../UI/Card/Card'
import classes from './Tweets.module.css'

const Tweets = (props) => {
    return (
        <Card>
            <div className={classes.tweets}>
                {props.tweets.map(({ id, user, message, stats, timestamp }) => {
                    return (
                        <Tweet
                            key={id}
                            user={user}
                            message={message}
                            stats={stats}
                            timestamp={timestamp}
                        />
                    )
                })}
            </div>
        </Card>
    )
}

export default Tweets
