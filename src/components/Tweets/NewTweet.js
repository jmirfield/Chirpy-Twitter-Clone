import React, { useRef } from 'react'
import TweetInput from '../UI/TweetInput/TweetInput'
import classes from './NewTweet.module.css'

const NewTweet = (props) => {
    const textAreaRef = useRef()

    const onSubmitTweetHandler = (e) => {
        e.preventDefault()
        if(textAreaRef.current.value.trim().length > 0)props.onAdd(textAreaRef.current.value)
        textAreaRef.current.value = ''
    }

    return (
        <div className={classes.main}>
            <div className={classes.profileIcon} />
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
