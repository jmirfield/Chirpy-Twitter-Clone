import React, { useContext } from 'react'
import Chirp from './Chirp'
import MainContext from '../../context/MainContext'
import Card from '../UI/Card/Card'
import classes from './Chirps.module.css'

const Chirps = ({ chirps }) => {
    const ctx = useContext(MainContext)
    return (
        <Card>
            <div className={classes.chirps}>
                {chirps.map(({ _id, owner_username, content, rechirpsCount,isRechirped, likesCount, isLiked, createdAt, rechirp }) => {
                    if (rechirp) {
                        return (
                            <Chirp
                                key={_id}
                                id={_id}
                                user={rechirp.original_owner}
                                message={content}
                                rechirps={rechirpsCount}
                                isChirpRechirped={ctx.user === owner_username}
                                likes={likesCount}
                                isChirpLiked={isLiked}
                                timestamp={rechirp.original_time}
                                rechirp={rechirp}
                            />
                        )
                    }
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
                        />
                    )
                })}
            </div>
        </Card>
    )
}

export default Chirps
