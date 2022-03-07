import React from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../Icon/Icon'
import { BACK_BUTTON } from '../../../constants/icon'
import styles from './Header.module.css'

const Header = ({ children, backButton }) => {

    const navigate = useNavigate()

    const goBackHandler = e => {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <header className={styles.header}>
            {backButton && <section className={styles.header__back}>
                <button href='#' onClick={goBackHandler}>
                    <Icon width='18px' height='18px' fill='white' d={BACK_BUTTON.d} />
                </button>
            </section>}
            <section className={styles.header__main}>
                {children}
            </section>
        </header>
    )
}

export default Header