import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Menubar from '../Menubar/Menubar'
import ChirpModal from './ChirpModal'
import classes from './MainLayout.module.css'

const MainLayout = (props) => {
    const [composeChirp, setComposeChirp] = useState(false)
    
    const onOpenNewChirpHandler = () => {
        setComposeChirp(true)
    }
    const onCloseNewChirpHandler = () => {
        setComposeChirp(false)
    }

    return (
        <div className={classes.layout}>
            <header className={classes.menubar}>
                <Menubar onNewChirp={onOpenNewChirpHandler} username={props.username}/>
            </header>
            <div className={classes.main}>
                <Outlet />
            </div>
            <div>
                {/* PLACEHOLDER */}
            </div>
            {composeChirp && <ChirpModal onClose={onCloseNewChirpHandler} />}
        </div>
    )
}

export default MainLayout
