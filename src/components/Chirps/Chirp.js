import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import ChirpIcons from './ChirpIcons'
import { date } from '../../helpers/date'
import MainContext from '../../context/MainContext'
import classes from './Chirp.module.css'
import Icon from '../UI/Icon/Icon'
import { RECHIRP } from '../../utils/icon'

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
                console.log(e.message)
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
                console.log(e.message)
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
                console.log(e.message)
            }
        } else {
            try {
                const req = !rechirp ? id : rechirp.original_id
                if (!rechirp) {
                    await fetch("http://localhost:3001/chirps/rechirp/delete", {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.jwt}`
                        },
                        body: JSON.stringify({ _id: req })
                    })
                } else {
                    await fetch("http://localhost:3001/chirps/rechirp/delete", {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.jwt}`
                        },
                        body: JSON.stringify({ _id: req })

                    })
                }
                dispatch({
                    type: 'REMOVE_RECHIRP',
                    payload: {
                        id: req,
                        user: state.user,
                        rechirps: rechirps - 1
                    }
                })
            } catch (e) {
                console.log(e.message)
            }
        }
    }

    const testHandler = () => {
        console.log('test')
    }

    const post_owner = rechirp ? rechirp.original_owner : user
    const post_id = rechirp ? rechirp.original_id : id
    const post_time = rechirp ? rechirp.original_time : timestamp

    return (
        <article>
            {rechirp &&
                <section className={classes['rechirp']}>
                    <Icon width='14px' height='14px' fill='rgb(101, 119, 134)' d={RECHIRP.d} />
                    <Link to={`/${user}`}>{user === state.user ? 'You Rechirped' : `${user} Rechirped`}</Link>
                </section>
            }
            <section className={classes['chirp']} key={id}>
                <Link to={`/${post_owner}`} className={classes['chirp__icon']} />
                <section className={classes['chirp__main']}>
                    <section className={classes['chirp__main-header']}>
                        <Link to={`/${post_owner}`} className={classes['chirp__main-user']}>{post_owner}</Link>
                        <span>·</span>
                        <Link to={`/${post_owner}/status/${post_id}`} className={classes['chirp__main-timestamp']}>{date(post_time)}</Link>
                    </section>
                    <section>
                        <Link to={`/${post_owner}/status/${post_id}`} className={classes['chirp__main-message']}>
                            <p>{message}</p>
                        </Link>
                    </section>
                    <ChirpIcons
                        stats={
                            [
                                { count: 0, active: false, onClick: testHandler },
                                { count: rechirps, active: isChirpRechirped, onClick: onRechirpButtonHandler },
                                { count: likes, active: isChirpLiked, onClick: onLikeButtonHandler }
                            ]
                        }
                    />
                </section>
            </section>
        </article>
    )
}

export default Chirp
