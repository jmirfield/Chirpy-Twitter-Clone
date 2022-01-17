import React from 'react'
import classes from './NewTweet.module.css'

const NewTweet = () => {
    return (
        <div className={classes.main}>
            <div className={classes.profileIcon}>
                {/* TEMP */}
            </div>
            <div className={classes.input}>
                <textarea></textarea>
                <button>Chirp</button>
            </div>
        </div>
    )
}

export default NewTweet
