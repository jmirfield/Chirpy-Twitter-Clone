import React from 'react'
import Search from '../Search/Search'
import FollowCard from './FollowCard'
import withClickOutside from '../../helpers/withClickOutside'
import styles from './styles.module.css'

const Sidebar = (props) => {

  const SearchWithClickOutside = withClickOutside(Search)

  return (
    <aside className={styles.sidebar}>
      {!props.onExplore &&
        <SearchWithClickOutside />
      }
      <FollowCard onExplore={props.onExplore} />
    </aside>
  )
}

export default Sidebar