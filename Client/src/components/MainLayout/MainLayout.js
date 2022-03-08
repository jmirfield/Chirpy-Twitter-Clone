import React, { useState, useCallback, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Menubar from '../Menubar/Menubar'
import Sidebar from '../Sidebar/Sidebar'
import ChirpModal from './ChirpModal'
import styles from './MainLayout.module.css'

const MainLayout = () => {
    const [composeNewChirp, setComposeNewChirp] = useState(false)
    const [onExplore, setOnExplore] = useState(false)
    const { state } = useContext(AuthContext)

    const onOpenNewChirpHandler = useCallback(() => {
        setComposeNewChirp(true)
    }, [])

    const onCloseNewChirpHandler = useCallback(() => {
        setComposeNewChirp(false)
    }, [])


    return (
        <div className={styles['layout']}>
            <Menubar onOpenModal={onOpenNewChirpHandler} username={state.user} />
            <main className={styles['layout__main']}>
                <Outlet context={{ setOnExplore }} />
            </main>
            <Sidebar onExplore={onExplore} />
            {composeNewChirp && <ChirpModal onClose={onCloseNewChirpHandler} />}
        </div>
    )
}

export default MainLayout
