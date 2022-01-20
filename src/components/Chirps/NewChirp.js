import React, { useRef, useContext } from 'react'
import ChirpInput from '../UI/ChirpInput/ChirpInput'
import AuthContext from '../../context/AuthContext'
import classes from './NewChirp.module.css'

const NewChirp = (props) => {
    const textAreaRef = useRef()
    const ctx = useContext(AuthContext)
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
            props.onAdd({...data, username: ctx.user})
        } catch (e) {
            console.log('ERROR')
        }
    }

    const onSubmitChirpHandler = (e) => {
        e.preventDefault()
        if (textAreaRef.current.value.trim().length > 0) sendNewChirpRequest(textAreaRef.current.value)
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
