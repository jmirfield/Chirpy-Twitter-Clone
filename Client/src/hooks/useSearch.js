import { useState, useEffect } from 'react'
import { getListOfUsersRequest } from '../actions/profile'

const useSearch = () => {
    const [text, setText] = useState('')
    const [search, setSearch] = useState(false)
    const [result, setResult] = useState([])

    const textChangeHandler = (e) => setText(e.target.value)
    const openSearch = () => setSearch(true)
    const closeSearch = () => setSearch(false)
    const resultHandler = (users) => setResult(users)
    const resetHandler = () => setResult([])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (text.trim().length > 0) getListOfUsersRequest(text, resultHandler)
            if (text.trim().length === 0) resetHandler()
        }, 500)
        return () => clearTimeout(timer)
    }, [text])

    return {
        text,
        search,
        result,
        textChangeHandler,
        openSearch,
        closeSearch,
        resultHandler,
        resetHandler
    }
}

export default useSearch