import React from 'react'
import Chirp from './Chirp'
import Card from '../UI/Card/Card'
import classes from './Chirps.module.css'

const Chirps = ({chirps}) => {
    return (
        <Card>
            <div className={classes.chirps}>
                {chirps.map(({_id, username, content, commentsCount, retweetsCount, likesCount, isLiked, createdAt}) => {
                    return (
                        <Chirp
                            key={_id}
                            id={_id}
                            user={username}
                            message={content}
                            comments={commentsCount}
                            retweets={retweetsCount}
                            likes={likesCount}
                            isChirpLiked={isLiked}
                            timestamp={createdAt}
                        />
                    )
                })}
            </div>
        </Card>
    )
}

export default Chirps
