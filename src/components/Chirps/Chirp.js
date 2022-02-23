import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { likeChirpRequest, onRechirpRequest } from '../../actions/chirps'
import Rechirp from './Rechirp'
import ChirpIcons from './ChirpIcons'
import ChirpHeader from './ChirpHeader'
import ChirpMessage from './ChirpMessage'
import ChirpImage from './ChirpImage'
import styles from './styles.module.css'
import ChirpOption from './ChirpOption'

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
                <ChirpImage owner={post_owner} image={image} />
                <section className={styles['chirp__body']}>
                    <ChirpHeader owner={post_owner} id={post_id} time={post_time} />
                    <ChirpMessage owner={post_owner} id={id} message={message} />
                    <ChirpIcons options={chirpOptions} />
                </section>
                <ChirpOption />
            </section>
        </article>
    )
}

export default Chirp
