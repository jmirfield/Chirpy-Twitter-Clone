import React from 'react'
import Button from '../UI/Button/Button'
import Icon from '../UI/Icon/Icon'
import { CHIRP } from '../../constants/icon'
import styles from './styles.module.css'

const MenuChirpButton = (props) => {
    return (
        <Button onClick={props.onClick} className={styles.menu__chirp}>
            <span>Chirp</span>
            <Icon width='24px' height='24px' d={CHIRP.d} fill='white' className={styles['menu__chirp-resize']} />
        </Button>
    )
}

export default MenuChirpButton