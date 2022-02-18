import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './ProfileTabs.module.css'

const ProfileTabs = ({ tabs }) => {

  return (
    <section className={classes['profile-tabs']}>
      {tabs.map((tab, idx) => {
        return (<NavLink
          key={idx}
          end={true}
          to={tab.link}
          className={({ isActive }) => isActive ? classes.active : classes.inactive}
          children={({ isActive }) => {
            return (
              <>
                <div className={classes.tab}>
                  <span>{tab.name}</span>
                </div>
                <div className={isActive ? classes['active-tab'] : ''} />
              </>

            )
          }}
        ></NavLink>)
      })}
    </section >
  )
}

export default ProfileTabs