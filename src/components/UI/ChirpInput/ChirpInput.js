import React from 'react'
import Button from '../Button/Button'
import classes from './ChirpInput.module.css'

const ChirpInput = ({text, onChange, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <textarea
                placeholder='Chirp chirp?'
                value={text}
                onChange={onChange}
            />
            <div className={classes.button}>
                <Button disabled={text.trim().length === 0 || text.length > 150}>Chirp</Button>
            </div>
        </form>
    )
}

export default ChirpInput
