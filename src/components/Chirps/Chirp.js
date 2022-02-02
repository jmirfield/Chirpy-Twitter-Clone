import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ChirpIcons from './ChirpIcons'
import classes from './Chirp.module.css'

const Chirp = ({ id, user, message, comments, retweets, isRetweet, likes, isChirpLiked, timestamp }) => {
    const [isLiked, setIsLiked] = useState(isChirpLiked)
    const [likeCount, setLikeCount] = useState(likes)

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
        <div className={classes['chirp']} key={id}>
            <span className={classes['chirp__icon']}></span>
            <div className={classes['chirp__main']}>
                <section>
                    <NavLink to={`/${user}`}>{user}</NavLink>
                    <span className={classes['chirp__main-timestamp']}>{timestamp}</span>
                </section>
                <section>
                    <p className={classes['chirp__main-message']}>{message}</p>
                </section>
                <section className={classes['chirp__main-actions']}>
                    <ChirpIcons stats={
                        [
                            { count: comments, active: false, onClick: testHandler },
                            { count: retweets, active: isRetweet, onClick: testHandler },
                            { count: likeCount, active: isLiked, onClick: onLikeButtonHandler }
                        ]
                    } />
                </section>
            </div>
        </div>
    )
}

export default Chirp
