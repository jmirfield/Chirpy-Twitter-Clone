import React from 'react'
import { Outlet } from 'react-router-dom'
import Menubar from '../Menubar/Menubar'
import classes from './MainLayout.module.css'

const MainLayout = () => {
    return (
        <div className={classes.layout}>
            <header>
                <Menubar />
            </header>
            <div className={classes.main}>
                <Outlet />
            </div>
            <div>
                {/* PLACEHOLDER */}
            </div>
        </div>
    )
}

export default MainLayout
