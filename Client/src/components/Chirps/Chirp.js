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
    const post_owner = props.rechirp ? props.rechirp.owner.username : props.owner.username
    const post_id = props.rechirp ? props.rechirp._id : props._id
    const post_time = props.rechirp ? props.rechirp.createdAt : props.createdAt
    const post_icon = props.rechirp ? props.rechirp.owner.profileImage : props.owner.profileImage

    const chirpOptions = [
        {
            count: 0,
            active: false,
            onClick: () => console.log('reply')
        },
        {
            count: props.rechirpsCount,
            active: props.isRechirped,
            onClick: onRechirpRequest.bind(this, props, state.user)
        },
        {
            count: props.likesCount,
            active: props.isLiked,
            onClick: likeChirpRequest.bind(this, props)
        }
    ]

    return (
        <article className={styles['chirp']} key={props._id}>
            {props.rechirp && <ChirpRechirpHeader user={props.owner.username} />}
            <section className={styles['chirp__main']}>
                <ChirpPostIcon owner={post_owner} profileImage={post_icon} />
                <section className={styles['chirp__body']}>
                    <ChirpHeader owner={post_owner} id={post_id} time={post_time} />
                    {props.content !== '**empty**' && <ChirpMessage owner={post_owner} id={post_id} message={props.content} />}
                    {props.imageURL && <ChirpImage owner={post_owner} id={post_id} imageURL={props.imageURL} />}
                    <ChirpIcons options={chirpOptions} />
                </section>
                <ChirpOption />
            </section>
        </article>
    )
}

export default Chirp
