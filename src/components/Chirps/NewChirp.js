import React, { useState } from 'react'
import ChirpInput from '../UI/ChirpInput/ChirpInput'
import classes from './NewChirp.module.css'

const NewChirp = (props) => {
    const [textInput, setTextInput] = useState('')

    const textChangeHandler = (e) => {
        setTextInput(e.target.value)
    }

    const resetTextHandler = () => {
        setTextInput('')
    }

    const sendNewChirpRequest = async (content) => {
        try {
            const response = await fetch("http://localhost:3001/chirps", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                },
                body: JSON.stringify({ content })
            })
            const data = await response.json()
            if (props.isModal) {
                props.onClose()
                //Will need to be fixed to update feed on home and profile when using menubar chirp buton
                return
            }
            props.onNewChirp({ ...data, isLiked: false, isRechirped: false })
        } catch (e) {
            console.log('Error with chirp request')
        }
    }

    const onSubmitChirpHandler = (e) => {
        e.preventDefault()
        if (textInput.trim().length > 0) sendNewChirpRequest(textInput)
        resetTextHandler()
    }

    return (
        <section className={`${props.className} ${classes['new-chirp']}`}>
            <img className={classes['new-chirp__icon']} />
            <div className={classes['new-chirp__input']}>
                <ChirpInput
                    onSubmit={onSubmitChirpHandler}
                    text={textInput}
                    onChange={textChangeHandler}
                />
            </div>
        </section>
    )
}

export default NewChirp
