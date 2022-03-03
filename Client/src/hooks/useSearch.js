import { useState, useEffect } from 'react'
import { getListOfUsersRequest } from '../actions/profile'

const useSearch = () => {
    const [text, setText] = useState('')
    const [search, setSearch] = useState(false)
    const [result, setResult] = useState([])
    const [message, setMessage] = useState('')

    const textChangeHandler = (e) => setText(e.target.value)
    const openSearch = () => setSearch(true)
    const closeSearch = () => setSearch(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (text.trim().length > 0) getListOfUsersRequest(text, (users) => {
                if (users.length === 0) setMessage('No users found')
                setResult(users)
            })
            if (text.trim().length === 0) {
                setResult([])
                setMessage('Try searching for people, topics, or keywords')
            }
        }, 500)
        return () => clearTimeout(timer)
    }, [text])

    return {
        text,
        search,
        result,
        message,
        textChangeHandler,
        openSearch,
        closeSearch
    }
}

export default useSearch