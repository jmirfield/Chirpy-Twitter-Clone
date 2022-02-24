import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { likeChirpRequest, onRechirpRequest } from '../../actions/chirps'
import ChirpRechirpHeader from './ChirpRechirpHeader'
import ChirpIcons from './ChirpIcons'
import ChirpHeader from './ChirpHeader'
import ChirpMessage from './ChirpMessage'
import ChirpPostIcon from './ChirpPostIcon'
import styles from './styles.module.css'
import ChirpOption from './ChirpOption'
import ChirpImage from './ChirpImage'

const Chirp = (props) => {
    const { state } = useContext(AuthContext)

    const post_owner = props.rechirp ? props.rechirp.original_owner : props.user
    const post_id = props.rechirp ? props.rechirp.original_id : props.id
    const post_time = props.rechirp ? props.rechirp.original_time : props.timestamp

    const chirpOptions = [
        {
            count: 0,
            active: false,
            onClick: () => console.log('reply')
        },
        {
            count: props.rechirps,
            active: props.isChirpRechirped,
            onClick: onRechirpRequest.bind(this, props, state.user)
        },
        {
            count: props.likes,
            active: props.isChirpLiked,
            onClick: likeChirpRequest.bind(this, props)
        }
    ]

    return (
        <article className={styles['chirp']} key={props.id}>
            {props.rechirp && <ChirpRechirpHeader user={props.user} />}
            <section className={styles['chirp__main']}>
                <ChirpPostIcon owner={post_owner} image={props.image} />
                <section className={styles['chirp__body']}>
                    <ChirpHeader owner={post_owner} id={post_id} time={post_time} />
                    {props.message !== '**empty**' && <ChirpMessage owner={post_owner} id={props.id} message={props.message} />}
                    {props.imageURL && <ChirpImage  owner={post_owner} id={props.id} imageURL={props.imageURL}/>}
                    <ChirpIcons options={chirpOptions} />
                </section>
                <ChirpOption />
            </section>
        </article>
    )
}

export default Chirp
