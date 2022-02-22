import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Icon from '../UI/Icon/Icon'
import { RECHIRP } from '../../constants/icon'
import styles from './Rechirp.module.css'

const Rechirp = (props) => {
    const { state } = useContext(AuthContext)
    return (
        <section className={styles['rechirp']}>
            <Icon
                width='14px'
                height='14px'
                fill='rgb(101, 119, 134)'
                d={RECHIRP.d}
            />
            <Link
                to={`/${props.user}`}
            >
                {props.user === state.user
                    ? 'You Rechirped'
                    : `${props.user} Rechirped`}
            </Link>
        </section>
    )
}

export default Rechirp