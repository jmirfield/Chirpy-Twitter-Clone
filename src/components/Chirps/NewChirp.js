import React, { useRef } from 'react'
import ChirpInput from '../UI/ChirpInput/ChirpInput'
import classes from './NewChirp.module.css'

const NewChirp = (props) => {
    const textAreaRef = useRef()

    const onSubmitChirpHandler = (e) => {
        e.preventDefault()
        if(textAreaRef.current.value.trim().length > 0)props.onAdd(textAreaRef.current.value)
        textAreaRef.current.value = ''
    }

    return (
        <div className={classes.main}>
            <div className={classes.profileIcon} />
            <div className={classes.input}>
                <ChirpInput
                    onSubmit={onSubmitChirpHandler}
                    ref={textAreaRef}
                />
            </div>
        </div>
    )
}

export default NewChirp
