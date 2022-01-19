import React from 'react'
import Chirp from './Chirp'
import Card from '../UI/Card/Card'
import classes from './Chirps.module.css'

const Chirps = (props) => {
    return (
        <Card>
            <div className={classes.chirps}>
                {props.chirps.map(({ id, user, message, stats, timestamp }) => {
                    return (
                        <Chirp
                            key={id}
                            user={user}
                            message={message}
                            stats={stats}
                            timestamp={timestamp}
                        />
                    )
                })}
            </div>
        </Card>
    )
}

export default Chirps
