import React, { useRef, useContext } from 'react'
import ChirpInput from '../UI/ChirpInput/ChirpInput'
import MainContext from '../../context/MainContext'
import classes from './NewChirp.module.css'

const NewChirp = (props) => {
    const textAreaRef = useRef()
    const ctx = useContext(MainContext)
    const sendNewChirpRequest = async (content) => {
        try {
            const response = await fetch("http://localhost:3001/chirps", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                },
                body: JSON.stringify({content})
            })
            const data = await response.json()
            if(props.isModal)props.onClose()
            props.onAdd({...data, username: ctx.user, isLiked: false})
        } catch (e) {
            console.log(e.message)
            console.log('ERROR')
        }
    }

    const onSubmitChirpHandler = (e) => {
        e.preventDefault()
        if (textAreaRef.current.value.trim().length > 0) sendNewChirpRequest(textAreaRef.current.value)
        textAreaRef.current.value = ''
    }

    return (
        <div className={classes['new-chirp']}>
            <div className={classes['new-chirp__icon']} />
            <div className={classes['new-chirp__input']}>
                <ChirpInput
                    onSubmit={onSubmitChirpHandler}
                    ref={textAreaRef}
                />
            </div>
        </div>
    )
}

export default NewChirp
