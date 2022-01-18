import React, { useRef } from 'react'
import TweetInput from '../UI/TweetInput/TweetInput'
import classes from './NewTweet.module.css'

const NewTweet = () => {
    const textAreaRef = useRef()

    const onSubmitTweetHandler = (e) => {
        e.preventDefault()
        textAreaRef.current.value = ''
    }

    return (
        <div className={classes.main}>
            <div className={classes.input}>
                <TweetInput
                    onSubmit={onSubmitTweetHandler}
                    ref={textAreaRef}
                />
            </div>
        </div>
    )
}

export default NewTweet
