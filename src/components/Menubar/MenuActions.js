import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import { logoutRequest } from '../../actions/auth';
import MenubarLogoutButton from './MenuLogoutButton';
import Button from '../UI/Button/Button';
import styles from './styles.module.css'

const MenuItemActions = (props) => {
    const { dispatch } = useContext(AuthContext)
    return (
        <section className={styles.menu__actions}>
            <Button onClick={props.onOpenModal} className={styles.menu__chirp}>Chirp</Button>
            <MenubarLogoutButton onClick={logoutRequest.bind(this, (dispatch))} />
        </section>
    )
}

export default MenuItemActions