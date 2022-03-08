import React from 'react'
import Modal from '../UI/Modal/Modal'
import NewChirp from './NewChirp'
import styles from './styles.module.css'

const ReplyModal = (props) => {
    return (
        <Modal onClick={props.onClose}>
            <NewChirp
                isModal={true}
                onClose={props.onClose}
                isReply={true}
                owner={props.owner}
                _id={props.id}
            />
        </Modal>
    )
}

export default ReplyModal