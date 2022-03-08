import React from 'react'
import Search from '../Search/Search'
import FollowCard from './FollowCard'
import styles from './styles.module.css'

const Sidebar = (props) => {

  return (
    <aside className={styles.sidebar}>
      {!props.onExplore &&
        <Search />
      }
      <FollowCard onExplore={props.onExplore} />
    </aside>
  )
}

export default Sidebar