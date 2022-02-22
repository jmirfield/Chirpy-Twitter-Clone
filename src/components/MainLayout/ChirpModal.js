import React from 'react'
import Modal from '../UI/Modal/Modal'
import NewChirp from '../Chirps/NewChirp'
import styles from './ChirpModal.module.css'

const ChirpModal = (props) => {
    return (
        <Modal onClick={props.onClose}>
            <NewChirp isModal={true} onClose={props.onClose} className={styles['new-chirp']}/>
        </Modal>
    )
}

export default ChirpModal
