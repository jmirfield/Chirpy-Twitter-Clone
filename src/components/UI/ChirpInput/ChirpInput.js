import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Button from '../Button/Button'
import classes from './ChirpInput.module.css'

const ChirpInput = ({ text, onChange, onSubmit }) => {

    const [focus, setFocus] = useState(false)

    const focusHandler = () => {
        setFocus(true)
    }


    const className = focus
        ? `${classes['chirp__form-action--active']} ${classes['chirp__form-action']}`
        : classes['chirp__form-action']

    return (
        <form onSubmit={onSubmit} className={classes.chirp__form}>
            <TextareaAutosize
                placeholder='Chirp chirp?'
                value={text}
                onChange={onChange}
                onFocus={focusHandler}
                minRows={2}
                maxRows={4}

            />
            <section className={className}>
                <Button disabled={text.trim().length === 0 || text.length > 150}>Chirp</Button>
            </section>
        </form>
    )
}

export default ChirpInput
