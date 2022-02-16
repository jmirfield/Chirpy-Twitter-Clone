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
        <section className={classes['chirp__actions']}>
            {Object.keys(CHIRP_ICONS).map((icon, idx) => {
                return (
                    <button className={classes['chirp__actions-icon']} key={idx} onClick={props.options[idx].onClick}>
                        <section className={`${classes[`chirp__actions-icon__${icon}`]} ${classes[`chirp__actions-icon__main`]}`}>
                            {!props.options[idx].active ?
                                <Icon width='24px' height='24px' fill='rgb(101, 119, 134)' d={CHIRP_ICONS[icon]} /> :
                                <Icon width='24px' height='24px' fill={`${activeColors[idx]}`} d={CHIRP_ICONS[icon]} />
                            }
                        </section>
                        <section className={classes['chirp__actions-icon__count']}>
                            {props.options[idx].count > 0 && <span>{props.options[idx].count}</span>}
                        </section>
                    </button>
                )
            })}
        </section>
    )
}

export default ChirpIcons
