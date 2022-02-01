import React, { useContext } from 'react'
import Modal from '../UI/Modal/Modal'
import NewChirp from '../Chirps/NewChirp'
import MainContext from '../../context/MainContext'

const ChirpModal = (props) => {
    const ctx = useContext(MainContext)
    return (
        <Modal onClick={props.onClose}>
            <NewChirp onAdd={ctx.onAddChirp} isModal={true} onClose={props.onClose} />
        </Modal>
    )
}

export default ChirpModal
