import React from 'react'
import { Link } from 'react-router-dom'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import styles from './styles.module.css'

const ProfileList = (props) => {
    return (
        <li className={styles.profile__list}>
            {props.users.map((user, idx) => {
                return (
                    <ul key={idx} className={styles.profile__item}>
                        <Link to={`/${user.username}`}>
                            <ProfileImage
                                className={styles.profile__user__icon}
                                src={user.image}
                            />
                            <span className={styles.profile__user}>{user.username}</span>
                        </Link>
                    </ul>
                )
            }
            )}
        </li>
    )
}

export default ProfileList