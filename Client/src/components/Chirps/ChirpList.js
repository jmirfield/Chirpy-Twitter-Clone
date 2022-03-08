import React from 'react'
import Chirp from './Chirp'
import LoadingFeed from '../Loading/LoadingFeed'
import styles from './ChirpList.module.css'

const ChirpList = ({ chirps, dispatch, error, isLoading }) => {
    
    if (isLoading) return  <LoadingFeed height={30} width={30} />
    if (!chirps || chirps.length === 0 || error) return <p className={styles['chirps-none']}>No chirps available...</p>

    return (
        <section className={styles.chirps}>
            {chirps.map((chirp) => {

                const {
                    _id,
                    owner,
                    content,
                    repliesCount,
                    rechirpsCount,
                    isRechirped,
                    likesCount,
                    isLiked,
                    createdAt,
                    imageURL = '',
                    rechirp = null,
                    reply = null
                } = chirp
                return (
                    <Chirp
                        key={_id}
                        _id={_id}
                        owner={owner}
                        content={content}
                        repliesCount={repliesCount}
                        rechirpsCount={rechirpsCount}
                        isRechirped={isRechirped}
                        likesCount={likesCount}
                        isLiked={isLiked}
                        createdAt={createdAt}
                        rechirp={rechirp}
                        reply={reply}
                        imageURL={imageURL}
                        dispatch={dispatch}
                    />
                )
            })}
        </section>
    )
}

export default ChirpList
