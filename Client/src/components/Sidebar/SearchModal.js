import React from 'react'
import ProfileList from '../Profile/ProfileList'
import Modal from '../UI/Modal/Modal'
import styles from './styles.module.css'

const SearchModal = (props) => {
  return (
    <Modal
      modalClass={styles.modal}
      backdropClass={styles.backdrop}
      onClick={props.onClose}
    >
      {props.users.length === 0
        ? !props.error ? <p>Try searching for people, topics, or keywords</p> : <p>{props.error}</p>
        : <ProfileList users={props.users} />
      }

    </Modal>
  )
}

export default SearchModal