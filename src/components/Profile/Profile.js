import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import MainContext from '../../context/MainContext';
import Chirps from '../Chirps/Chirps';
import classes from './Profile.module.css'

const Profile = () => {
    const ctx = useContext(MainContext)
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

            const { feed, likedChirps } = await response.json()
            ctx.onGetFeed(feed, likedChirps)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        ctx.onClearFeed()
        getUserProfileFeed()
    }, [])

    return (
        <>
            <div className={classes['profile_chirps']}>
                {ctx.chirps.length > 0 ? <Chirps chirps={ctx.chirps} /> : <p className={classes['home__chirps-none']}>No chirps available...</p>}
            </div>
        </>
    )
};

export default Profile;
