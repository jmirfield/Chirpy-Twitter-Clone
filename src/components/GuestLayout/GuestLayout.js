import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom'
import GuestMenuBar from './GuestMenuBar';
import classes from './GuestLayout.module.css'

const GuestLayout = () => {
    const params = useParams()
    const [chirps, setChirps] = useState([])
    const [error, setError] = useState('')

    const getUserProfile = async () => {
        try {
            const response = await fetch(`http://localhost:3001/chirps/${params.user}`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
            })
            const data = await response.json()
            setChirps(data)
        } catch (e) {
            console.log(e.message)
            setError('Could not find profile')
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    return (
        <div className={classes.layout}>
            <header className={classes.menubar}>
                <GuestMenuBar />
            </header>
            <div className={classes.main}>
                {
                    !error ?
                        chirps.map((chirp, idx) => {
                            return <p key={idx}>{chirp.content}</p>
                        }) :
                        <p>{error}</p>
                }
            </div>
            <div>
                {/* PLACEHOLDER */}
            </div>
        </div>
    )
};

export default GuestLayout;
