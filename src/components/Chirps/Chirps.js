import React from 'react'
import Chirp from './Chirp'
import Card from '../UI/Card/Card'
import classes from './Chirps.module.css'

const Chirps = ({chirps}) => {
    return (
        <Card>
            <div className={classes.chirps}>
                {chirps.map((chirp) => {
                    return (
                        <Chirp
                            key={chirp._id}
                            id={chirp._id}
                            user={chirp.username}
                            message={chirp.content}
                            comments={chirp.commentsCount}
                            retweets={chirp.retweetsCount}
                            likes={chirp.likesCount}
                            isChirpLiked={chirp.isLiked}
                            timestamp={chirp.createdAt}
                        />
                    )
                })}
            </div>
        </Card>
    )
}

export default Chirps
