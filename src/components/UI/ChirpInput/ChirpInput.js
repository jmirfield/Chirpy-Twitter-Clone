import React from 'react'
import Button from '../Button/Button'
import classes from './ChirpInput.module.css'

const ChirpInput = React.forwardRef((props, ref) => {
    return (
        <form onSubmit={props.onSubmit}>
            <textarea
                placeholder='Chirp chirp?'
                ref={ref}
            ></textarea>
            <div className={classes.button}>
                <Button>Chirp</Button>
            </div>
        </form>
    )
})

export default ChirpInput
