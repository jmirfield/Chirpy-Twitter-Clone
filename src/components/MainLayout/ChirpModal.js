import React from 'react'
import Modal from '../UI/Modal/Modal'
import NewChirp from '../Chirps/NewChirp'
import classes from './ChirpModal.module.css'

const ChirpModal = (props) => {
    return (
        <Modal onClick={props.onClose}>
            <NewChirp isModal={true} onClose={props.onClose} className={classes['new-chirp']}/>
        </Modal>
    )
}

export default ChirpModal
