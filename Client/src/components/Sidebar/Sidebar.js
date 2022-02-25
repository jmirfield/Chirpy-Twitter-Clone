import React, { useState, useEffect } from 'react'
import { getListOfUsersRequest } from '../../actions/profile'
import SearchInput from '../UI/SearchInput/SearchInput'
import SearchModal from './SearchModal'
import styles from './styles.module.css'

const Sidebar = () => {
  const [text, setText] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [users, setUsers] = useState([])

  const searchChangeHandler = (e) => setText(e.target.value)
  const openModalHandler = () => setOpenModal(true)
  const closeModalHandler = () => setOpenModal(false)

  const userHandler = (users) => {
    setUsers(users)
  }

  const resetHandler = () => {
    setUsers([])
  }


  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.trim().length > 0) getListOfUsersRequest(text, userHandler)
      if (text.trim().length === 0) resetHandler()
    }, 500)
    return () => clearTimeout(timer)
  }, [text])

  return (
    <aside className={styles.sidebar}>
      <SearchInput
        text={text}
        onChange={searchChangeHandler}
        onFocus={openModalHandler}
      />
      {openModal &&
        <SearchModal
          onClose={closeModalHandler}
          users={users}
        />
      }
    </aside>
  )
}

export default Sidebar