import React from 'react'
import Modal from '../UI/Modal/Modal'
import NewChirp from '../Chirps/NewChirp'

const ChirpModal = (props) => {
    return (
        <Modal onClick={props.onClose}>
            <NewChirp isModal={true} onClose={props.onClose} />
        </Modal>
    )
}

export default ChirpModal
