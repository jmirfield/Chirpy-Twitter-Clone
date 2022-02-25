import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { getListOfUsersRequest } from '../../actions/profile'
import SearchInput from '../UI/SearchInput/SearchInput'
import ExploreModal from './ExploreModal'

const Explore = () => {
    const { setOnExplore } = useOutletContext()
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
        setOnExplore(true)
        const timer = setTimeout(() => {
            if (text.trim().length > 0) getListOfUsersRequest(text, userHandler)
            if (text.trim().length === 0) resetHandler()
        }, 500)
        return () => {
            setOnExplore(false)
            clearTimeout(timer)
        }
    }, [text])

    return (
        <>
            <SearchInput
                text={text}
                onChange={searchChangeHandler}
                onFocus={openModalHandler}
            />
            {openModal && <ExploreModal
                onClose={closeModalHandler}
                users={users}
            />}
        </>
    )
}

export default Explore