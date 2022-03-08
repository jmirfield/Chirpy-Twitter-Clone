import React from 'react'
import useSearch from '../../hooks/useSearch'
import SearchInput from './SearchInput'
import SearchDropdown from './SearchDropdown'
import withClickOutside from '../../helpers/withClickOutside'
import styles from './styles.module.css'

const Search = React.forwardRef(({open, setOpen}, ref) => {
    const {
        text,
        result,
        message,
        textChangeHandler
    } = useSearch()

    const openSearch = () => setOpen(true)

    return (
        <section className={styles.search} ref={ref}>
            <SearchInput
                text={text}
                onChange={textChangeHandler}
                onFocus={openSearch}
            />
            {open &&
                <SearchDropdown 
                    result={result}
                    message={message}
                />
            }
        </section>
    )
})

export default withClickOutside(Search)