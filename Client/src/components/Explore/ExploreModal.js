import React from 'react'
import Modal from '../UI/Modal/Modal'
import ProfileList from '../Profile/ProfileList'
import styles from './styles.module.css'

const ExploreModal = (props) => {
  return (
    <Modal
      modalClass={styles.modal}
      backdropClass={styles.backdrop}
      onClick={props.onClose}
    >
      {props.users.length === 0
        ? <p>{props.message}</p>
        : <ProfileList users={props.users} />
      }
    </Modal>
  )
}

export default ExploreModal