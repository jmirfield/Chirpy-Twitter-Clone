import React from 'react'
import MenuItem from './MenuItem'
import { LOGO } from '../../utils/icon';

const MenuItems = (props) => {
    return (
        <>
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
        </>
    )
}

export default MenuItems