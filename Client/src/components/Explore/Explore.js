import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import Search from '../Search/Search'
import withClickOutside from '../../helpers/withClickOutside'

const Explore = () => {
    const { setOnExplore } = useOutletContext()

    useEffect(() => {
        setOnExplore(true)
        return () => setOnExplore(false)
    }, [])

    const SearchWithClickOutside = withClickOutside(Search)

    return (
        <SearchWithClickOutside />
    )
}

export default Explore