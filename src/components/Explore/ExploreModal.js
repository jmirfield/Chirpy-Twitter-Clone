import React from 'react'
import Modal from '../UI/Modal/Modal'
import styles from './styles.module.css'

const ExploreModal = (props) => {
  return (
    <Modal
      modalClass={styles.modal}
      backdropClass={styles.backdrop}
      onClick={props.onClose}
    >
      <p>
        Try searching for people, topics, or keywords
      </p>
    </Modal>
  )
}

export default ExploreModal