import React from 'react'
import Icon from '../UI/Icon/Icon'
import { CHIRP_ICONS } from '../../utils/icon'
import classes from './ChirpIcons.module.css'

const ChirpIcons = (props) => {
    const activeColors = {
        0: 'rgb(101, 119, 134)',
        1: 'green',
        2: 'red'
    }
    return (
        <>
            {Object.keys(CHIRP_ICONS).map((icon, idx) => {
                return (
                    <button className={classes['icon']} key={idx} onClick={props.stats[idx].onClick}>
                        <section className={`${classes[`icon__${icon}`]} ${classes[`icon__main`]}`}>
                            {!props.stats[idx].active ?
                                <Icon width='24px' height='24px' fill='rgb(101, 119, 134)' d={CHIRP_ICONS[icon]} /> :
                                <Icon width='24px' height='24px' fill={`${activeColors[idx]}`} d={CHIRP_ICONS[icon]} />
                            }
                        </section>
                        <section className={classes['icon__count']}>
                            {props.stats[idx].count > 0 && <span>{props.stats[idx].count}</span>}
                        </section>
                    </button>
                )
            })}
        </>
    )
}

export default ChirpIcons
