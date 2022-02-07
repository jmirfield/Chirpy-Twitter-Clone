import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ChirpIcons from './ChirpIcons'
import { date } from '../../helpers/date'
import classes from './Chirp.module.css'

const Chirp = ({ id, user, message, comments, retweets, isRetweet, likes, isChirpLiked, timestamp }) => {
    const [isLiked, setIsLiked] = useState(isChirpLiked)
    const [likeCount, setLikeCount] = useState(likes)

    const time = new Date(timestamp)

    const onLikeButtonHandler = async () => {
        if (!isLiked) {
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
                            { count: retweets, active: false, onClick: testHandler },
                            { count: likeCount, active: isLiked, onClick: onLikeButtonHandler }
                        ]
                    } />
                </section>
            </div>
        </article>
    )
}

export default Chirp
