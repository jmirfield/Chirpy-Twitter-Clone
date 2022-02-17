import React from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '../UI/Icon/Icon';

const MenuItem = (props) => {
    return (
        <ul className={props.className}>
            <NavLink
                to={props.link}
                children={({ isActive }) => {
                    return (
                        <>
                            <Icon
                                width='28px'
                                height='28px'
                                fill='white'
                                d={props.d || (isActive ? props.active : props.inactive)} />
                            {props.label &&
                                <span
                                    style={isActive
                                        ? { fontWeight: 'bold' }
                                        : { fontWeight: 'normal' }}
                                >
                                    {`${props.label}`}
                                </span>}
                        </>
                    )
                }} />
        </ul>
    )
}

export default MenuItem