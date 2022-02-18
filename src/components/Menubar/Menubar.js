import React, { useContext } from 'react'
import MainContext from '../../context/MainContext';
import MenuItemList from './MenuItemList';
import MenubarLogout from './MenubarLogout';
import Button from '../UI/Button/Button';
import { PATHS } from '../../constants/menu';
import classes from './Menubar.module.css'

const Menubar = (props) => {
    const { dispatch } = useContext(MainContext)

    const links = Object.keys(PATHS).map(path => {
        let link = path.toLowerCase()
        if (link === 'profile') link = `${props.username}`
        if (link === 'lists') link = 'flow/lists'
        if (link === 'bookmarks') link = 'flow/bookmarks'
        return link
    })

    const logoutRequestHandler = async () => {
        try {
            await fetch("http://localhost:3001/users/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            })
            localStorage.removeItem('jwt')
            dispatch({ type: 'RESET' })
        } catch (e) {
            console.log('Error with logging out')
        }
    }

    return (
        <nav className={classes.menu}>
            <MenuItemList
                paths={PATHS}
                links={links}
                className={classes.menu__item}
            />
            <section className={classes['menu__item-actions']}>
                <Button onClick={props.onOpenModal}>Chirp</Button>
                <MenubarLogout />
            </section>
        </nav>
    )
}

export default Menubar
