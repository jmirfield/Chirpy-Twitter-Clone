import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ChirpIcons from './ChirpIcons'
import { date } from '../../helpers/date'
import classes from './Chirp.module.css'

const Chirp = ({ id, user, message, comments, rechirps, isChirpRechirped, likes, isChirpLiked, timestamp, rechirp_original }) => {
    const [isLiked, setIsLiked] = useState(isChirpLiked)
    const [likeCount, setLikeCount] = useState(likes)
    const [isRechirped, setIsRechirped] = useState(isChirpRechirped)
    const [rechirpCount, setRechirpCount] = useState(rechirps)

    const onLikeButtonHandler = async () => {
        if (!isLiked && !rechirp_original) {
            try {
                const response = await fetch("http://localhost:3001/users/like", {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                    body: JSON.stringify({ _id: id })
                })
                setIsLiked(true)
                setLikeCount(prev => prev + 1)
            } catch (e) {
                console.log(e.message)
            }
        } else if(rechirp_original) {
            console.log('hello')
        } else {
            try {
                const response = await fetch("http://localhost:3001/users/unlike", {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                    body: JSON.stringify({ _id: id })
                })
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
                const response = await fetch("http://localhost:3001/chirps/rechirp", {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    },
                    body: JSON.stringify({
                        content: message,
                        rechirpsCount: rechirps,
                        likesCount: likes,
                        rechirp: {
                            original_id: id,
                            original_owner: user,
                            original_time: timestamp
                        } 
                    })
                })
                setIsRechirped(true)
                setRechirpCount(prev => prev + 1)
            } catch (e) {
                console.log(e.message)
            }
        } else {
            console.log('test')
        }
    }

    const testHandler = () => {
        console.log('test')
    }
    return (
        <article className={classes['chirp']} key={id}>
            <Link to={`/${user}`} className={classes['chirp__icon']} />
            <div className={classes['chirp__main']}>
                <section className={classes['chirp__main-header']}>
                    <Link to={`/${user}`} className={classes['chirp__main-user']}>{user}</Link>
                    <span>·</span>
                    <Link to={`/${user}/status/${id}`} className={classes['chirp__main-timestamp']}>{date(timestamp)}</Link>
                </section>
                <section>
                    <Link to={`/${user}/status/${id}`} className={classes['chirp__main-message']}>
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
    )
}

export default Chirp
