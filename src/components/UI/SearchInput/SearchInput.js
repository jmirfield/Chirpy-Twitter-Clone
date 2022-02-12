import React, { useState } from 'react'
import { SEARCH } from '../../../utils/icon'
import Icon from '../Icon/Icon'
import classes from './SearchInput.module.css'

const SearchInput = () => {
    const [isActive, setIsActive] = useState(false)

    const focusHandler = () => {
        setIsActive(true)
    }

    const blurHandler = () => {
        setIsActive(false)
    }

    return (
        <div className={`${classes.input} ${isActive && classes.active}`}>
            <Icon width='20px' height='20px' fill={!isActive ? 'rgb(110, 118, 125)' : 'rgb(29,155,240)'} d={SEARCH.d} />
            <input
                placeholder='Search Chirpy'
                onFocus={focusHandler}
                onBlur={blurHandler}
            />
        </div>
    )
}

export default SearchInput