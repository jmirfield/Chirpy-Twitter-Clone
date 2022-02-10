import React from 'react'
import Chirp from './Chirp'
import Card from '../UI/Card/Card'
import classes from './Chirps.module.css'

const Chirps = ({ chirps, onDelete, onRechirp, onSyncFeed }) => {
    return (
        <Card>
            <div className={classes.chirps}>
                {chirps.map(({ _id, owner_username, content, rechirpsCount, isRechirped, likesCount, isLiked, createdAt, rechirp = null }) => {
                    return (
                        <Chirp
                            key={_id}
                            id={_id}
                            user={owner_username}
                            message={content}
                            rechirps={rechirpsCount}
                            isChirpRechirped={isRechirped}
                            likes={likesCount}
                            isChirpLiked={isLiked}
                            timestamp={createdAt}
                            rechirp={rechirp}
                            onDelete={onDelete}
                            onRechirp={onRechirp}
                            onSyncFeed={onSyncFeed}
                        />
                    )
                })}
            </div>
        </Card>
    )
}

export default Chirps
