import React, { useState, useEffect } from 'react'
import SearchInput from '../UI/SearchInput/SearchInput'
import SearchModal from './SearchModal'
import styles from './styles.module.css'

const Sidebar = () => {
  const [text, setText] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const searchChangeHandler = (e) => setText(e.target.value)
  const openModalHandler = () => setOpenModal(true)
  const closeModalHandler = () => setOpenModal(false)


  useEffect(() => {
    const timer = setTimeout(() => {
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
      {openModal && <SearchModal onClose={closeModalHandler} />}
    </aside>
  )
}

export default Sidebar