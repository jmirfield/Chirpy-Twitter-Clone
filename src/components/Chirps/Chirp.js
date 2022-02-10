import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import ChirpIcons from './ChirpIcons'
import { date } from '../../helpers/date'
import MainContext from '../../context/MainContext'
import classes from './Chirp.module.css'

const Chirp = ({ id, user, message, comments, rechirps, isChirpRechirped, likes, isChirpLiked, timestamp, rechirp, onDelete, onRechirp }) => {
    const [isLiked, setIsLiked] = useState(isChirpLiked)
    const [likeCount, setLikeCount] = useState(likes)
    const [isRechirped, setIsRechirped] = useState(isChirpRechirped)
    const [rechirpCount, setRechirpCount] = useState(rechirps)

    const ctx = useContext(MainContext)

    const onLikeButtonHandler = async () => {
        if (!isLiked) {
            try {
                if (!rechirp) {
                    await fetch("http://localhost:3001/users/like", {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.jwt}`
                        },
                        body: JSON.stringify({ _id: id })
                    })
                } else {
                    await fetch("http://localhost:3001/users/like", {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.jwt}`
                        },
                        body: JSON.stringify({ _id: rechirp.original_id })
                    })
                }
                setIsLiked(true)
                setLikeCount(prev => prev + 1)
            } catch (e) {
                console.log(e.message)
            }
        } else {
            try {
                if (!rechirp) {
                    await fetch("http://localhost:3001/users/unlike", {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.jwt}`
                        },
                        body: JSON.stringify({ _id: id })
                    })
                } else {
                    await fetch("http://localhost:3001/users/unlike", {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.jwt}`
                        },
                        body: JSON.stringify({ _id: rechirp.original_id })
                    })
                }
                setIsLiked(false)
                setLikeCount(prev => prev - 1)
            } catch (e) {
                console.log(e.message)
            }
        }
    }

    const onRechirpButtonHandler = async () => {
        if (!isRechirped) {
            try {
                const req = !rechirp ? {
                    content: message,
                    rechirpsCount: rechirps,
                    likesCount: likes,
                    rechirp: {
                        original_id: id,
                        original_owner: user,
                        original_time: timestamp
                    }
                } : {
                    content: message,
                    rechirpsCount: rechirps,
                    likesCount: likes,
                    rechirp: {
                        original_id: rechirp.original_id,
                        original_owner: rechirp.original_owner,
                        original_time: rechirp.original_time
                    }
                }
                const response = await fetch("http://localhost:3001/chirps/rechirp", {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                    body: JSON.stringify(req)
                })
                const data = await response.json()
                onRechirp({ ...data, 
                    username: ctx.user, 
                    isLiked: isChirpLiked, 
                    isRechirped: true 
                })
                setIsRechirped(true)
                setRechirpCount(prev => prev + 1)
            } catch (e) {
                console.log(e.message)
            }
        } else {
            try {
                if (!rechirp) {
                    await fetch("http://localhost:3001/chirps/rechirp/delete", {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.jwt}`
                        },
                        body: JSON.stringify({ _id: id })
                    })
                    setIsRechirped(false)
                    setRechirpCount(prev => prev - 1)
                    onDelete(id)
                } else {
                    await fetch("http://localhost:3001/chirps/rechirp/delete", {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.jwt}`
                        },
                        body: JSON.stringify({ _id: rechirp.original_id })
                    })
                    onDelete(rechirp.original_id)
                }
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

    return (
        <>
            {rechirp && <span>Is rechirped by {`${user}`}</span>}
            <article className={classes['chirp']} key={id}>
                <Link to={`/${post_owner}`} className={classes['chirp__icon']} />
                <div className={classes['chirp__main']}>
                    <section className={classes['chirp__main-header']}>
                        <Link to={`/${post_owner}`} className={classes['chirp__main-user']}>{post_owner}</Link>
                        <span>·</span>
                        <Link to={`/${post_owner}/status/${post_id}`} className={classes['chirp__main-timestamp']}>{date(timestamp)}</Link>
                    </section>
                    <section>
                        <Link to={`/${post_owner}/status/${post_id}`} className={classes['chirp__main-message']}>
                            <p>{message}</p>
                        </Link>
                    </section>
                    <section className={classes['chirp__main-actions']}>
                        <ChirpIcons stats={
                            [
                                { count: comments, active: false, onClick: testHandler },
                                { count: rechirpCount, active: isRechirped, onClick: onRechirpButtonHandler },
                                { count: likeCount, active: isLiked, onClick: onLikeButtonHandler }
                            ]
                        } />
                    </section>
                </div>
            </article>
        </>
    )
}

export default Chirp
