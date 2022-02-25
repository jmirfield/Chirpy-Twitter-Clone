import React from 'react'
import { MenuItemList } from './MenuItems';
import MenuActions from './MenuActions';
import { PATHS } from '../../constants/menu';
import styles from './styles.module.css'

const Menubar = (props) => {
    const links = Object.keys(PATHS).map(path => {
        let link = path.toLowerCase()
        if (link === 'profile') link = `${props.username}`
        if (link === 'lists') link = 'flow/lists'
        if (link === 'bookmarks') link = 'flow/bookmarks'
        return link
    })

    return (
        <header className={styles.menu}>
            <nav className={styles.menu__nav}>
                <MenuItemList
                    paths={PATHS}
                    links={links}
                />
                <MenuActions
                    onOpenModal={props.onOpenModal}
                />
            </nav>
        </header>
    )
}

export default Menubar
