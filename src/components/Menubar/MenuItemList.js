import React from 'react'
import MenuItem from './MenuItem'
import { LOGO } from '../../constants/icon';

const MenuItemList = (props) => {
    return (
        <li>
            <MenuItem 
                key={'logo'}
                link={'/'}
                className={props.className}
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
                            className={props.className}
                        />
                    )
                })
            }
        </li>
    )
}

export default MenuItemList