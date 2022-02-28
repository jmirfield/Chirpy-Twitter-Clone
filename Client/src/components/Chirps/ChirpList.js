import React, { useContext } from 'react'
import Chirp from './Chirp'
import LoadingFeed from '../Loading/LoadingFeed'
import styles from './ChirpList.module.css'
import AuthContext from '../../context/AuthContext'

const ChirpList = ({ chirps, dispatch, error, isLoading }) => {
    const { state } = useContext(AuthContext)

    if (isLoading) {
        return (
            <div style={{ 'marginTop': '1rem' }}>
                <LoadingFeed height={30} width={30} />
            </div>
        )
    }

    if (!chirps || chirps.length === 0 || error) return <p className={styles['chirps-none']}>No chirps available...</p>

    return (
        <section className={styles.chirps}>
            {chirps.map((chirp) => {
                // console.log(chirp)
                const {
                    _id,
                    owner,
                    content,
                    rechirpsCount,
                    isRechirped,
                    likesCount,
                    isLiked,
                    createdAt,
                    imageURL = '',
                    rechirp = null
                } = chirp
                return (
                    <Chirp
                        key={_id}
                        _id={_id}
                        owner={owner}
                        content={content}
                        rechirpsCount={rechirpsCount}
                        isRechirped={isRechirped}
                        likesCount={likesCount}
                        isLiked={isLiked}
                        createdAt={createdAt}
                        rechirp={rechirp}
                        imageURL={imageURL}
                        dispatch={dispatch}
                    />
                )
            })}
        </section>
    )
}

export default ChirpList
