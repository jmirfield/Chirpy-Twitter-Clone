import React, { useState, useEffect } from 'react'
import SearchInput from '../UI/SearchInput/SearchInput'

const Sidebar = () => {
  const [text, setText] = useState('')
  const searchChangeHandler = (e) => setText(e.target.value)

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(text)
    }, 500)
    return () => clearTimeout(timer)
  }, [text])

  return (
    <>
      <SearchInput text={text} onChange={searchChangeHandler} />
    </>
  )
}

export default Sidebar