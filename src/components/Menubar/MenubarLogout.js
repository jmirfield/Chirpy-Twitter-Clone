import React, { useContext } from 'react'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import MainContext from '../../context/MainContext'
import classes from './MenubarLogout.module.css'

const MenubarLogout = () => {
    const { state } = useContext(MainContext)
    return (
        <button className={classes.logout}>
            <ProfileImage
                default={true}
                className={classes.logout__icon}
            />
            <span>{state.user}</span>
        </button>
    )
}

export default MenubarLogout