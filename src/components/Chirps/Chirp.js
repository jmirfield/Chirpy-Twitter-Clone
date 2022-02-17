import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import MainContext from '../../context/MainContext'
import Rechirp from './Rechirp'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import ChirpIcons from './ChirpIcons'
import { date } from '../../helpers/date'
import classes from './Chirp.module.css'

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
    dispatch
}) => {

    const { state } = useContext(MainContext)

    const onLikeButtonHandler = async () => {
        const req = !rechirp ? id : rechirp.original_id
        if (!isChirpLiked) {
            try {
                await fetch("http://localhost:3001/users/like", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                    body: JSON.stringify({ _id: req })
                })
                dispatch({
                    type: 'LIKE',
                    payload: {
                        id: req,
                        likes: likes + 1
                    }
                })
            } catch (e) {
                console.log('Error with liking')
            }
        } else {
            try {
                await fetch("http://localhost:3001/users/unlike", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                    body: JSON.stringify({ _id: req })
                })
                dispatch({
                    type: 'UNLIKE',
                    payload: {
                        id: req,
                        likes: likes - 1
                    }
                })
            } catch (e) {
                console.log('Error with liking')
            }
        }
    }

    const onRechirpButtonHandler = async () => {
        if (!isChirpRechirped) {
            try {
                const req = !rechirp ? {
                    content: message,
                    rechirp: {
                        original_id: id,
                        original_owner: user,
                        original_time: timestamp
                    }
                } : {
                    content: message,
                    rechirp: {
                        original_id: rechirp.original_id,
                        original_owner: rechirp.original_owner,
                        original_time: rechirp.original_time
                    }
                }
                const response = await fetch("http://localhost:3001/chirps/rechirp", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                    body: JSON.stringify(req)
                })
                const { chirp } = await response.json()
                dispatch({
                    type: 'ADD_RECHIRP',
                    payload: {
                        chirp: {
                            ...chirp,
                            isLiked: isChirpLiked,
                            isRechirped: isChirpRechirped
                        },
                        id: req.rechirp.original_id,
                        rechirps: rechirps + 1
                    }
                })
            } catch (e) {
                console.log('Error with rechirping')
            }
        } else {
            try {
                const req = !rechirp ? id : rechirp.original_id
                await fetch("http://localhost:3001/chirps/rechirp/delete", {
                    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                    body: JSON.stringify({ _id: req })
                })
                dispatch({
                    type: 'REMOVE_RECHIRP',
                    payload: {
                        id: req,
                        user: state.user,
                        rechirps: rechirps - 1
                    }
                })
            } catch (e) {
                console.log('Error with rechirping')
            }
        }
    }

    const testHandler = () => {
        console.log('test')
    }

    const post_owner = rechirp ? rechirp.original_owner : user
    const post_id = rechirp ? rechirp.original_id : id
    const post_time = rechirp ? rechirp.original_time : timestamp

    const chirpIconOptions = [
        { count: 0, active: false, onClick: testHandler },
        { count: rechirps, active: isChirpRechirped, onClick: onRechirpButtonHandler },
        { count: likes, active: isChirpLiked, onClick: onLikeButtonHandler }
    ]

    return (
        <article className={classes['chirp']} key={id}>
            {rechirp && <Rechirp user={user} />}
            <section className={classes['chirp__main']}>
                <Link to={`/${post_owner}`}>
                    <ProfileImage
                        className={classes['chirp__icon']}
                        default={true}
                    />
                </Link>
                <section className={classes['chirp__body']}>
                    <section className={classes['chirp__header']}>
                        <section>
                            <Link
                                to={`/${post_owner}`}
                                className={classes['chirp__user']}
                            >
                                {post_owner}
                            </Link>
                            <span>·</span>
                            <Link
                                to={`/${post_owner}/status/${post_id}`}
                                className={classes['chirp__timestamp']}
                            >
                                {date(post_time)}
                            </Link>
                        </section>
                    </section>
                    <Link
                        to={`/${post_owner}/status/${post_id}`}
                        className={classes['chirp__message']}
                    >
                        <p>{message}</p>
                    </Link>
                    <ChirpIcons options={chirpIconOptions} />
                </section>
                <section className={classes.chirp__options}>
                    <button>···</button>
                </section>
            </section>
        </article>
    )
}

export default Chirp
