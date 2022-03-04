import React from 'react'
import Icon from '../UI/Icon/Icon'
import { CHIRP_ICONS } from '../../constants/icon'
import styles from './ChirpIcons.module.css'

const ChirpIcons = (props) => {
    const activeColors = {
        0: 'rgb(101, 119, 134)',
        1: 'green',
        2: 'red'
    }

    return (
        <section className={styles['chirp__actions']}>
            {Object.keys(CHIRP_ICONS).map((icon, idx) => {
                const clickHandler = (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    props.options[idx].onClick()
                }
                return (
                    <button className={styles['chirp__actions-icon']} key={idx} onClick={clickHandler}>
                        <section className={`${styles[`chirp__actions-icon__${icon}`]} ${styles[`chirp__actions-icon__main`]}`}>
                            {!props.options[idx].active ?
                                <Icon width='24px' height='24px' fill='rgb(101, 119, 134)' d={CHIRP_ICONS[icon]} /> :
                                <Icon width='24px' height='24px' fill={`${activeColors[idx]}`} d={CHIRP_ICONS[icon]} />
                            }
                        </section>
                        <section className={styles['chirp__actions-icon__count']}>
                            {props.options[idx].count > 0 && <span>{props.options[idx].count}</span>}
                        </section>
                    </button>
                )
            })}
        </section>
    )
}

export default ChirpIcons
