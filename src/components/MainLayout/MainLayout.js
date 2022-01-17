import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import classes from './MainLayout.module.css'

const MainLayout = () => {
    return (
        <div className={classes.layout}>
            <div className={classes.sidebar}>
                <Sidebar />
            </div>
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
