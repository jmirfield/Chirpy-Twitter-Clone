import React, { useState } from 'react'
import Button from '../Button/Button'
import classes from './ChirpInput.module.css'

const ChirpInput = React.forwardRef((props, ref) => {
    const [textInput, setTextInput] = useState('')
    const textChangeHandler = (e) => {
        setTextInput(e.target.value)
    }
    return (
        <form onSubmit={props.onSubmit}>
            <textarea
                placeholder='Chirp chirp?'
                ref={ref}
                value={textInput}
                onChange={textChangeHandler}
            ></textarea>
            <div className={classes.button}>
                <Button disabled={textInput.trim().length === 0 || textInput.length > 150}>Chirp</Button>
            </div>
        </form>
    )
})

export default ChirpInput
