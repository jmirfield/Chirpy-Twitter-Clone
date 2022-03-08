import React, { useContext } from 'react'
import Icon from '../UI/Icon/Icon'
import { DELETE } from '../../constants/icon'
import styles from './styles.module.css'
import AuthContext from '../../context/AuthContext'

const ChirpDropdown = (props) => {
    const { state } = useContext(AuthContext)
    return (
        <section className={styles.chirp__dropdown}>
            {(state.user === props.owner) &&
                <button className={styles.chirp__delete} onClick={props.onDelete}>
                    <Icon width='24px' height='24px' d={DELETE.d} fill='red' />
                    <span>Delete</span>
                </button>
            }
        </section>
    )
}

export default ChirpDropdown