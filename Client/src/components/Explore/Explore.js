import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import Search from '../Search/Search'


const Explore = () => {
    const { setOnExplore } = useOutletContext()

    useEffect(() => {
        setOnExplore(true)
        return () => setOnExplore(false)
    }, [])


    return (
        <>
            <Search />
        </>
    )
}

export default Explore