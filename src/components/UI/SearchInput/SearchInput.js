import React, { useState } from 'react'
import { SEARCH } from '../../../constants/icon'
import Icon from '../Icon/Icon'
import styles from './SearchInput.module.css'

const SearchInput = (props) => {
    const [isActive, setIsActive] = useState(false)

    const focusHandler = () => {
        setIsActive(true)
        props.onFocus()
    }

    const blurHandler = () => {
        setIsActive(false)
    }

    return (
        <div className={`${styles.input} ${isActive && styles.active}`}>
            <Icon width='20px' height='20px' fill={!isActive ? 'rgb(110, 118, 125)' : 'rgb(29,155,240)'} d={SEARCH.d} />
            <input
                placeholder='Search Chirpy'
                onFocus={focusHandler}
                onBlur={blurHandler}
                onChange={props.onChange}
                value={props.text}
            />
        </div>
    )
}

export default SearchInput