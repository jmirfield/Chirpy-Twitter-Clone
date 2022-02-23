import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { likeChirpRequest, onRechirpRequest } from '../../actions/chirps'
import Rechirp from './Rechirp'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import ChirpIcons from './ChirpIcons'
import { date } from '../../utils/date'
import styles from './Chirp.module.css'

const Chirp = ({
    id,
    user,
    message,
    rechirps,
    isChirpRechirped,
    likes,
    isChirpLiked,
    timestamp,
    rechirp,
    image,
    dispatch
}) => {
    const { state } = useContext(AuthContext)

    const testHandler = () => {
        console.log('test')
    }

    const post_owner = rechirp ? rechirp.original_owner : user
    const post_id = rechirp ? rechirp.original_id : id
    const post_time = rechirp ? rechirp.original_time : timestamp

    const chirpOptions = [
        {
            count: 0,
            active: false,
            onClick: testHandler
        },
        {
            count: rechirps,
            active: isChirpRechirped,
            onClick: onRechirpRequest.bind(this, dispatch, id, message, timestamp, image, isChirpRechirped, isChirpLiked, rechirps, rechirp, user, state.user)
        },
        {
            count: likes,
            active: isChirpLiked,
            onClick: likeChirpRequest.bind(this, dispatch, id, isChirpLiked, likes, rechirp)
        }
    ]

    return (
        <article className={styles['chirp']} key={id}>
            {rechirp && <Rechirp user={user} />}
            <section className={styles['chirp__main']}>
                <Link to={`/${post_owner}`}>
                    <ProfileImage
                        className={styles['chirp__icon']}
                        src={image}
                    />
                </Link>
                <section className={styles['chirp__body']}>
                    <section className={styles['chirp__header']}>
                        <section>
                            <Link
                                to={`/${post_owner}`}
                                className={styles['chirp__user']}
                            >
                                {post_owner}
                            </Link>
                            <span>·</span>
                            <Link
                                to={`/${post_owner}/status/${post_id}`}
                                className={styles['chirp__timestamp']}
                            >
                                {date(post_time)}
                            </Link>
                        </section>
                    </section>
                    <Link
                        to={`/${post_owner}/status/${post_id}`}
                        className={styles['chirp__message']}
                    >
                        <p>{message}</p>
                    </Link>
                    <ChirpIcons options={chirpOptions} />
                </section>
                <section className={styles.chirp__options}>
                    <button>···</button>
                </section>
            </section>
        </article>
    )
}

export default Chirp
