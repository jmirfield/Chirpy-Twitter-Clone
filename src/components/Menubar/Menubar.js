import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '../UI/Icon/Icon';
import Button from '../UI/Button/Button';
import MainContext from '../../context/MainContext';
import { LOGO } from '../../utils/icon';
import { PATHS } from '../../utils/menu';
import classes from './Menubar.module.css'

const Menubar = (props) => {
    const ctx = useContext(MainContext)

    return (
        <div className={classes.menu}>
            <div className={classes['menu__logo']}>
                <NavLink to='/'>
                    <Icon width='28px' height='28px' fill='white' d={LOGO} />
                </NavLink>
            </div>
            {Object.keys(PATHS).map((path, idx) => {
                let link = path.toLowerCase()
                if (link === 'profile') link = `${props.username}`
                else if (link === 'lists') link = `${props.username}/lists`
                else if (link === 'bookmarks') link = 'flow/bookmarks'
                return (
                    <NavLink to={link} key={idx} end={true} children={({ isActive }) => {
                        return (
                            <div className={classes['menu__item']}>
                                <Icon
                                    width='28px'
                                    height='28px'
                                    fill='white'
                                    d={isActive ? PATHS[path].active : PATHS[path].inactive} />
                                <span>{`${path}`}</span>
                            </div>
                        )
                    }} />
                )
            }
            )}
            <div className={classes['menu__item-actions']}>
                <Button onClick={props.onOpenModal}>Chirp</Button>
                <Button onClick={ctx.onLogout}>Logout</Button>
            </div>
        </div>
    )
}

export default Menubar
