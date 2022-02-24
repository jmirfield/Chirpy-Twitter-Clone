import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import SearchInput from '../UI/SearchInput/SearchInput'
import ExploreModal from './ExploreModal'

const Explore = () => {
    const { setOnExplore } = useOutletContext()
    const [text, setText] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const searchChangeHandler = (e) => setText(e.target.value)
    const openModalHandler = () => setOpenModal(true)
    const closeModalHandler = () => setOpenModal(false)

    useEffect(() => {
        setOnExplore(true)
        return () => setOnExplore(false)
    }, [])

    return (
        <>
            <SearchInput
                text={text}
                onChange={searchChangeHandler}
                onFocus={openModalHandler}
            />
            {openModal && <ExploreModal onClose={closeModalHandler}/>}
        </>
    )
}

export default Explore