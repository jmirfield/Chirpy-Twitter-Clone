import React from 'react'
import useSearch from '../../hooks/useSearch'
import SearchInput from '../UI/SearchInput/SearchInput'
import FollowCard from './FollowCard'
import SearchModal from './SearchModal'
import styles from './styles.module.css'

const Sidebar = (props) => {
  const {
    text,
    search,
    result,
    message,
    textChangeHandler,
    openSearch,
    closeSearch
  } = useSearch()

  return (
    <aside className={styles.sidebar}>
      {!props.onExplore &&
        <SearchInput
          text={text}
          onChange={textChangeHandler}
          onFocus={openSearch}
        />}
      <FollowCard />
      {search &&
        <SearchModal
          onClose={closeSearch}
          users={result}
          message={message}
        />}
    </aside>
  )
}

export default Sidebar