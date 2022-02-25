import React, { useContext } from 'react'
import ProfileImage from '../UI/ProfileImage/ProfileImage'
import AuthContext from '../../context/AuthContext'
import styles from './styles.module.css'

const MenubarLogout = (props) => {
    const { state } = useContext(AuthContext)

    return (
        <button
            onClick={props.onClick}
            className={styles.menu__logout}
        >
            <ProfileImage
                default={true}
                className={styles.menu__icon}
                src={state.profileImage}
            />
            <span className={styles.menu__user}>{state.user}</span>
        </button>
    )
}

export default MenubarLogout