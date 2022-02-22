import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './ProfileTabs.module.css'

const ProfileTabs = ({ tabs }) => {

  return (
    <section className={styles['profile-tabs']}>
      {tabs.map((tab, idx) => {
        return (<NavLink
          key={idx}
          end={true}
          to={tab.link}
          className={({ isActive }) => isActive ? styles.active : styles.inactive}
          children={({ isActive }) => {
            return (
              <>
                <div className={styles.tab}>
                  <span>{tab.name}</span>
                </div>
                <div className={isActive ? styles['active-tab'] : ''} />
              </>

            )
          }}
        ></NavLink>)
      })}
    </section >
  )
}

export default ProfileTabs