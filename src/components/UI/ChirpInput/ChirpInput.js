import React, { useState, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Icon from '../Icon/Icon'
import { IMAGE } from '../../../constants/icon'
import Button from '../Button/Button'
import styles from './ChirpInput.module.css'

const ChirpInput = ({ text, onChange, onSubmit }) => {

    const [focus, setFocus] = useState(false)
    const imageRef = useRef(null)

    const focusHandler = () => {
        setFocus(true)
    }
    const uploadImageHandler = () => {
        imageRef.current.click()
        console.log('test')
    }   


    const className = focus
        ? `${styles['chirp__form-action--active']} ${styles['chirp__form-action']}`
        : styles['chirp__form-action']

    return (
        <form onSubmit={onSubmit} className={styles.chirp__form}>
            <TextareaAutosize
                placeholder='Chirp chirp?'
                value={text}
                onChange={onChange}
                onFocus={focusHandler}
                minRows={2}
                maxRows={4}

            />
            <section className={className}>
                {focus && 
                <>
                    <Icon d={IMAGE.d} fill='rgb(29, 155, 240)' height='24px' width='24px' className={styles.image} onClick={uploadImageHandler}/>
                    <input type='file' style={{'display': 'none'}} ref={imageRef} accept='image/*'/>
                </>
                }

                <Button disabled={text.trim().length === 0 || text.length > 150}>Chirp</Button>
            </section>
        </form>
    )
}

export default ChirpInput
