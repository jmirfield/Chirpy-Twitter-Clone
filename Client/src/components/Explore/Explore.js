import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import useSearch from '../../hooks/useSearch'
import SearchInput from '../UI/SearchInput/SearchInput'
import ExploreModal from './ExploreModal'

const Explore = () => {
    const { setOnExplore } = useOutletContext()
    const {
        text,
        search,
        result,
        message,
        textChangeHandler,
        openSearch,
        closeSearch
    } = useSearch()

    useEffect(() => {
        setOnExplore(true)
        return () => setOnExplore(false)
    }, [])

    return (
        <>
            <SearchInput
                text={text}
                onChange={textChangeHandler}
                onFocus={openSearch}
            />
            {search &&
                <ExploreModal
                    onClose={closeSearch}
                    users={result}
                    message={message}
                />}
        </>
    )
}

export default Explore