import React from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '../UI/Icon/Icon';
import { LOGO } from '../../constants/icon';
import styles from './styles.module.css'


export const MenuItemList = (props) => {
    return (
        <li className={styles.menu__list}>
            <MenuItem
                key={'logo'}
                link={'/'}
                d={LOGO}
            />
            {
                Object.keys(props.paths).map((path, idx) => {
                    return (
                        <MenuItem
                            key={path}
                            label={path}
                            link={props.links[idx]}
                            inactive={props.paths[path].inactive}
                            active={props.paths[path].active}
                        />
                    )
                })
            }
        </li>
    )
}

export const MenuItem = (props) => {
    return (
        <ul className={styles.menu__item}>
            <NavLink
                to={props.link}
                children={({ isActive }) => {
                    return (
                        <>
                            <Icon
                                width='24px'
                                height='24px'
                                fill='white'
                                d={props.d || (isActive ? props.active : props.inactive)}
                            />
                            {props.label &&
                                <span
                                    style={isActive
                                        ? { fontWeight: 'bold' }
                                        : { fontWeight: 'normal' }}
                                    className={styles.menu__label}
                                >{`${props.label}`}</span>
                            }
                        </>
                    )
                }} />
        </ul>
    )
}
