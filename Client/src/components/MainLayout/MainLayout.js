import React, { useState, useCallback, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Menubar from '../Menubar/Menubar'
import Sidebar from '../Sidebar/Sidebar'
import ChirpModal from './ChirpModal'
import styles from './MainLayout.module.css'

const MainLayout = () => {
    const [composeChirp, setComposeChirp] = useState(false)
    const [onExplore, setOnExplore] = useState(false)
    const { state } = useContext(AuthContext)

    const onOpenNewChirpHandler = useCallback(() => {
        setComposeChirp(true)
    }, [])

    const onCloseNewChirpHandler = useCallback(() => {
        setComposeChirp(false)
    }, [])


    return (
        <div className={styles['layout']}>
            <Menubar onOpenModal={onOpenNewChirpHandler} username={state.user} />
            <main className={styles['layout__main']}>
                <Outlet context={{ setOnExplore }} />
            </main>
            <Sidebar onExplore={onExplore} />
            {composeChirp && <ChirpModal onClose={onCloseNewChirpHandler} />}
        </div>
    )
}

export default MainLayout
