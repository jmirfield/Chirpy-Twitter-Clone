import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import { logoutRequest } from '../../actions/auth';
import MenuItemList from './MenuItemList';
import MenubarLogout from './MenubarLogout';
import Button from '../UI/Button/Button';
import { PATHS } from '../../constants/menu';
import classes from './Menubar.module.css'

const Menubar = (props) => {
    const { dispatch } = useContext(AuthContext)

    const links = Object.keys(PATHS).map(path => {
        let link = path.toLowerCase()
        if (link === 'profile') link = `${props.username}`
        if (link === 'lists') link = 'flow/lists'
        if (link === 'bookmarks') link = 'flow/bookmarks'
        return link
    })

    return (
        <nav className={classes.menu}>
            <MenuItemList
                paths={PATHS}
                links={links}
                className={classes.menu__item}
            />
            <section className={classes['menu__item-actions']}>
                <Button onClick={props.onOpenModal}>Chirp</Button>
                <MenubarLogout onClick={logoutRequest.bind(this, dispatch)} />
            </section>
        </nav>
    )
}

export default Menubar
