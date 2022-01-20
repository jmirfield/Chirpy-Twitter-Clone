import React from 'react'
import Chirp from './Chirp'
import Card from '../UI/Card/Card'
import classes from './Chirps.module.css'

const Chirps = (props) => {
    return (
        <Card>
            <div className={classes.chirps}>
                {props.chirps.map(({ _id, username, content, likescount, commentscount , createdAt }) => {
                    return (
                        <Chirp
                            key={_id}
                            user={username}
                            message={content}
                            likes={likescount}
                            comments={commentscount}
                            timestamp={createdAt}
                        />
                    )
                })}
            </div>
        </Card>
    )
}

export default Chirps
