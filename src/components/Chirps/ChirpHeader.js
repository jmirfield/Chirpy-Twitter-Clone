import React from 'react'
import { Link } from 'react-router-dom'
import { date } from '../../utils/date'
import styles from './styles.module.css'

const ChirpHeader = ({ owner, id, time }) => {
    return (
        <section className={styles['chirp__header']}>
            <Link
                to={`/${owner}`}
                className={styles['chirp__user']}
            >{owner}</Link>
            <span>·</span>
            <Link
                to={`/${owner}/status/${id}`}
                className={styles['chirp__timestamp']}
            >{date(time)}</Link>
        </section>
    )
}

export default ChirpHeader