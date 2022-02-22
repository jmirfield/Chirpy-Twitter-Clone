import React from 'react'
import { useParams } from 'react-router-dom'
import Icon from '../UI/Icon/Icon'
import { BACK_BUTTON } from '../../constants/icon'
import styles from './styles.module.css'

const ProfileHeader = (props) => {
    const { user } = useParams()
    return (
        <header className={styles['profile__header']}>
            <section className={styles['profile__header__back']}>
                <button href='#' onClick={props.onBackButton}>
                    <Icon width='18px' height='18px' fill='white' d={BACK_BUTTON.d} />
                </button>
            </section>
            <section className={styles['profile__header__main']}>
                <h3>{user}</h3>
                <span className={styles.profile__span}>
                    {/* Will need to be fixed when feed gets pulled incrementally */}
                    {props.chirpCount !== null && `${props.chirpCount} chirps`}
                </span>
            </section>
        </header>
    )
}

export default ProfileHeader