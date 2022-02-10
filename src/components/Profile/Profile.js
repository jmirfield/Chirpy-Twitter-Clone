import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import Chirps from '../Chirps/Chirps';
import classes from './Profile.module.css'

const Profile = (props) => {
    const params = useParams()
    const getUserProfileFeed = async () => {
        try {
            const response = await fetch(`http://localhost:3001/chirps/auth/${params.user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            })

            const { feed, likedChirps, retweetedChirps } = await response.json()
            props.onGetFeed(feed, likedChirps, retweetedChirps)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        if (props.chirps.length > 0) props.onClearFeed()
        getUserProfileFeed()
    }, [params.user])

    return (
        <>
            <div className={classes['profile_chirps']}>
                {props.chirps.length > 0
                    ? <Chirps
                        chirps={props.chirps}
                        onDelete={props.onDeleteChirp}
                        onRechirp={props.onNewChirp}
                        onSyncFeed={props.onSyncFeed}
                    />
                    : <p className={classes['home__chirps-none']}>No chirps available...</p>}
            </div>
        </>
    )
};

export default Profile;
