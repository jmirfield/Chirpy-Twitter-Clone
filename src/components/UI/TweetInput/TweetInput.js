import React from 'react'
import Button from '../Button/Button'
import classes from './TweetInput.module.css'

const TweetInput = () => {
    return (
        <>
            <textarea placeholder='Chirp chirp?'></textarea>
            <div className={classes.button}>
                <Button>Chirp</Button>
            </div>
        </>
    )
}

export default TweetInput
