import React from 'react'
import Modal from '../UI/Modal/Modal'
import NewChirp from '../Chirps/NewChirp'

const ChirpModal = (props) => {
    return (
        <Modal onClick={props.onClose}>
            <NewChirp />
        </Modal>
    )
}

export default ChirpModal
