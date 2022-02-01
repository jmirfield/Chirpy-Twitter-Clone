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
        <div className={classes.chirp} key={id}>
            <span className={classes.tempIcon}></span>
            <div className={classes.chirpMain}>
                <div>
                    <NavLink to={`/${user}`}>{user}</NavLink>
                    <span className={classes.chirpTime}>{timestamp}</span>
                </div>
                <p className={classes.chirpMessage}>{message}</p>
                <div className={classes.chirpActions}>
                    <ChirpIcons stats={
                        [
                            { count: comments, active: false, onClick: testHandler },
                            { count: retweets, active: isRetweet, onClick: testHandler },
                            { count: likeCount, active: isLiked, onClick: onLikeButtonHandler }
                        ]
                    } />
                </div>
            </div>
        </div>
    )
}

export default Chirp
