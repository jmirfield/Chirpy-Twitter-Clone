import { useState, useEffect } from 'react'
import { getListOfUsersRequest } from '../actions/profile'

const useSearch = () => {
    const [text, setText] = useState('')
    const [search, setSearch] = useState(false)
    const [result, setResult] = useState([])
    const [error, setError] = useState('')

    const textChangeHandler = (e) => setText(e.target.value)
    const openSearch = () => setSearch(true)
    const closeSearch = () => setSearch(false)
    const resetHandler = () => {
        setResult([])
        setError('')
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (text.trim().length > 0) getListOfUsersRequest(text, (users) => {
                if (users.length === 0) setError('Could not find any users')
                setResult(users)
            })
            if (text.trim().length === 0) resetHandler()
        }, 500)
        return () => clearTimeout(timer)
    }, [text])

    return {
        text,
        search,
        result,
        error,
        textChangeHandler,
        openSearch,
        closeSearch
    }
}

export default useSearch