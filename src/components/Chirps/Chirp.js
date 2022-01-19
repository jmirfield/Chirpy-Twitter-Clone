import React from 'react'
import { NavLink } from 'react-router-dom'
import ChirpIcons from './ChirpIcons'
import classes from './Chirp.module.css'

const Chirp = React.memo(({ id, user, message, stats, timestamp }) => {
    // console.log('render')
    return (
        <div className={classes.chirp} key={id}>
            <span className={classes.tempIcon}></span>
            <div className={classes.chirpMain}>
                <div>
                    <NavLink to={`/${user}`}>{user}</NavLink>
                    <span className={classes.chirpTime}>{timestamp}</span>
                </div>
                <p className={classes.chirpMessage}>{message}</p>
                <div className={classes.chirpActions}>
                    <ChirpIcons stats={stats} />
                </div>
            </div>
        </div>
    )
})

export default Chirp
