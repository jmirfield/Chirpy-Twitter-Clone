import React from 'react'
import Chirp from './Chirp'
import LoadingFeed from '../Loading/LoadingFeed'
import classes from './ChirpList.module.css'

const ChirpList = ({ chirps, dispatch, error, isLoading }) => {

    if (isLoading) {
        return (
            <div style={{ 'marginTop': '1rem' }}>
                <LoadingFeed height={30} width={30} />
            </div>
        )
    }
    if (!chirps || chirps.length === 0 || error) return <p className={classes['chirps-none']}>No chirps available...</p>

    return (
        <section className={classes.chirps}>
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
                        dispatch={dispatch}
                    />
                )
            })}
        </section>
    )
}

export default ChirpList
