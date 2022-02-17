import React from 'react'
import { useParams } from 'react-router-dom'
import Icon from '../UI/Icon/Icon'
import { BACK_BUTTON } from '../../utils/icon'
import classes from './ProfileHeader.module.css'

const ProfileHeader = (props) => {
    const { user } = useParams()
    return (
        <header className={classes['profile__header']}>
            <section className={classes['profile__header-back']}>
                <a href='#' onClick={props.onBackButton}>
                    <Icon width='18px' height='18px' fill='white' d={BACK_BUTTON.d} />
                </a>
            </section>
            <section className={classes['profile__header-main']}>
                <h3>{user}</h3>
                <span>
                    {/* Will need to be fixed when feed gets pulled incrementally */}
                    {props.chirpCount !== null && `${props.chirpCount} chirps`}
                </span>
            </section>
        </header>
    )
}

export default ProfileHeader