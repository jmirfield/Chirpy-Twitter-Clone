import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './ProfileTabs.module.css'

const ProfileTabs = () => {
  return (
    <section className={classes['profile-tabs']}>
      <NavLink
        end={true}
        to=''
        className={({ isActive }) => isActive ? classes.active : classes.inactive}
        children={({ isActive }) => {
          return (
            <>
              <div className={classes.tab}>
                <span>Chirps</span>
              </div>
              <div className={isActive ? classes['active-tab'] : ''} />
            </>

          )
        }}
      ></NavLink>
      <NavLink
        to='media'
        className={({ isActive }) => isActive ? classes.active : classes.inactive}
        children={({ isActive }) => {
          return (
            <>
              <div className={classes.tab}>
                <span>Media</span>
              </div>
              <div className={isActive ? classes['active-tab'] : ''} />
            </>

          )
        }}
      ></NavLink>
      <NavLink
        to='likes'
        className={({ isActive }) => isActive ? classes.active : classes.inactive}
        children={({ isActive }) => {
          return (
            <>
              <div className={classes.tab}>
                <span>Likes</span>
              </div>
              <div className={isActive ? classes['active-tab'] : ''} />
            </>

          )
        }}
      ></NavLink>
    </section>
  )
}

export default ProfileTabs