import React, { useContext } from 'react';
import { useParams } from 'react-router-dom'
import MainContext from '../../context/MainContext';

const Profile = () => {
    const ctx = useContext(MainContext)
    const params = useParams()

    const getUserProfileFeed = async () => {
        try {
            const response = await fetch(`http://localhost:3001/chirps/${params.user}`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
            })
        
            const data = await response.json()

        } catch (e) {
            console.log(e.message)
            setError('Could not find profile')
        }
    }

    return <div>{params.user}</div>;
};

export default Profile;
