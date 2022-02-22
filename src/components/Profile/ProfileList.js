import React from 'react'
import { Link } from 'react-router-dom'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import styles from './styles.module.css'

const ProfileList = (props) => {
    return (
        <li>
            {props.users.map((user, idx) => {
                return (
                    <ul key={idx} className={styles.profile__list}>
                        <Link to={`/${user}`}>
                            <ProfileImage className={styles.profile__user__icon} />
                            <span className={styles.profile__user}>{user}</span>
                        </Link>
                    </ul>
                )
            }
            )}
        </li>
    )
}

export default ProfileList