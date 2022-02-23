import React, { useState, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Icon from '../Icon/Icon'
import { CANCEL, IMAGE } from '../../../constants/icon'
import Button from '../Button/Button'
import styles from './ChirpInput.module.css'

const ChirpInput = ({ text, image, onChange, onImage, onCancel, onSubmit }) => {

    const [focus, setFocus] = useState(false)
    const imageRef = useRef(null)

    const focusHandler = () => {
        setFocus(true)
    }
    const imageHandler = () => {
        imageRef.current.click()
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
            {image && (
                <>
                    <Icon d={CANCEL.d} height='24px' width='24px' fill='white' className={styles['staged-cancel']} onClick={onCancel}/>
                    <img className={styles.staged} src={image.blob} />
                </>
            )}
            <section className={className}>
                {focus &&
                    <>
                        <Icon d={IMAGE.d} fill='rgb(29, 155, 240)' height='24px' width='24px' className={styles.image} onClick={imageHandler} />
                        <input type='file' style={{ 'display': 'none' }} ref={imageRef} accept='image/*' onChange={onImage} />
                    </>
                }

                <Button disabled={(text.trim().length === 0 || text.length > 150) && !image}>Chirp</Button>
            </section>
        </form>
    )
}

export default ChirpInput
