import React, { useState, useEffect } from 'react'
import SearchInput from '../UI/SearchInput/SearchInput'

const Sidebar = () => {
  const [text, setText] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const searchChangeHandler = (e) => setText(e.target.value)
  const openModalHandler = () => setOpenModal(true)


  useEffect(() => {
    const timer = setTimeout(() => {
    }, 500)
    return () => clearTimeout(timer)
  }, [text])

  return (
    <>
      <SearchInput
        text={text}
        onChange={searchChangeHandler}
        onFocus={openModalHandler}
      />
      {openModal && <h1 />}
    </>
  )
}

export default Sidebar