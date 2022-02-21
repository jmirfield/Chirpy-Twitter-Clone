import React, { useState, useCallback, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Menubar from '../Menubar/Menubar'
import Sidebar from '../Sidebar/Sidebar'
import ChirpModal from './ChirpModal'
import classes from './MainLayout.module.css'

const MainLayout = () => {
    const [composeChirp, setComposeChirp] = useState(false)
    const { state } = useContext(AuthContext)

    const onOpenNewChirpHandler = useCallback(() => {
        setComposeChirp(true)
    }, [])

    const onCloseNewChirpHandler = useCallback(() => {
        setComposeChirp(false)
    }, [])

    return (
        <div className={classes['layout']}>
            <header className={classes['layout__menubar']}>
                <Menubar onOpenModal={onOpenNewChirpHandler} username={state.user} />
            </header>
            <main className={classes['layout__main']}>
                <Outlet />
            </main>
            <aside className={classes['layout__sidebar']}>
                <Sidebar />
            </aside>
            {composeChirp && <ChirpModal onClose={onCloseNewChirpHandler} />}
        </div>
    )
}

export default React.memo(MainLayout)
