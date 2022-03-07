import React from 'react'
import Header from '../UI/Header/Header'
import styles from './styles.module.css'

const ProfileHeader = (props) => {
    return (
        <Header backButton={true}>
            {props.user &&
                <section className={styles['profile__header__main']}>
                    <h3>{props.user}</h3>
                    <span className={styles.profile__span}>
                        {props.chirpCount !== null && `${props.chirpCount} chirps`}
                    </span>
                </section>
            }
        </Header>

    )
}

export default ProfileHeader