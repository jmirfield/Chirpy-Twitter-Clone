import React from 'react'
import Modal from '../UI/Modal/Modal'
import styles from './styles.module.css'

const SearchModal = (props) => {
  return (
    <Modal
      modalClass={styles.modal}
      backdropClass={styles.backdrop}
      onClick={props.onClose}
    >
      Test
    </Modal>
  )
}

export default SearchModal