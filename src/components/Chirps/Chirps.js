import React from 'react'
import Chirp from './Chirp'

const Chirps = ({ chirps, onDeleteRechirp, onRechirp, syncFeed }) => {
    return (
        <>
            {chirps.map(({
                _id,
                owner_username,
                content,
                rechirpsCount,
                isRechirped,
                likesCount,
                isLiked,
                createdAt,
                rechirp = null
            }) => {
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
                        onDeleteRechirp={onDeleteRechirp}
                        onRechirp={onRechirp}
                        syncFeed={syncFeed}
                    />
                )
            })}
        </>
    )
}

export default Chirps
