import React, { useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import Menubar from '../Menubar/Menubar'
import ChirpModal from './ChirpModal'
import classes from './MainLayout.module.css'

const MainLayout = (props) => {
    const [composeChirp, setComposeChirp] = useState(false)

    const onOpenNewChirpHandler = useCallback(() => {
        setComposeChirp(true)
    }, [])

    const onCloseNewChirpHandler = useCallback(() => {
        setComposeChirp(false)
    }, [])

    return (
        <div className={classes['layout']}>
            <header className={classes['layout__menubar']}>
                <Menubar onNewChirp={onOpenNewChirpHandler} username={props.username} />
            </header>
            <section className={classes['layout__main']}>
                <Outlet />
            </section>
            <section  className={classes['layout__new-chirp-modal']}>
                {composeChirp && <ChirpModal onClose={onCloseNewChirpHandler} />}
            </section>
        </div>
    )
}

export default React.memo(MainLayout)
