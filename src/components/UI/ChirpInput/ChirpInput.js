import React from 'react'
import Button from '../Button/Button'
import classes from './ChirpInput.module.css'

const ChirpInput = ({text, onChange, onSubmit}) => {
    return (
        <form onSubmit={onSubmit} className={classes.chirp__form}>
            <textarea
                placeholder='Chirp chirp?'
                value={text}
                onChange={onChange}
            />
            <section className={classes['chirp__form-action']}>
                <Button disabled={text.trim().length === 0 || text.length > 150}>Chirp</Button>
            </section>
        </form>
    )
}

export default ChirpInput
