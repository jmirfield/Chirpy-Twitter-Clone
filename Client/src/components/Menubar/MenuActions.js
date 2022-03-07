import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import { logoutRequest } from '../../actions/auth';
import MenuChirpButton from './MenuChirpButton';
import MenubarLogoutButton from './MenuLogoutButton';
import styles from './styles.module.css'

const MenuItemActions = (props) => {
    const { dispatch } = useContext(AuthContext)
    return (
        <section className={styles.menu__actions}>
            <MenuChirpButton onClick={props.onOpenModal} />
            <MenubarLogoutButton onClick={logoutRequest.bind(this, (dispatch))} />
        </section>
    )
}

export default MenuItemActions