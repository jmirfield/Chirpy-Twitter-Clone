import React from 'react'
import ProfileList from '../Profile/ProfileList'
import styles from './styles.module.css'

const SearchDropdown = (props) => {
    return (
        <section className={styles.search__dropdown}>
            {props.result.length === 0
                ? <p>{props.message}</p>
                : <ProfileList users={props.result} />
            }
        </section>
    )
}

export default SearchDropdown