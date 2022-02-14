import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import MainContext from '../../context/MainContext';
import ChirpList from '../Chirps/ChirpList';
import LoadingFeed from '../Loading/LoadingFeed';
import classes from './Profile.module.css'
import ProfileHeader from './ProfileHeader';
import ProfileSummary from './ProfileSummary';

const Profile = (props) => {

    const params = useParams()
    const navigate = useNavigate()
    const ctx = useContext(MainContext)
    const myProfile = params.user === ctx.user

    const [isLoading, setIsLoading] = useState(true)
    const [isFollow, setIsFollow] = useState(false)
    const [error, setError] = useState(false)

    const getUserProfileFeed = async () => {
        try {
            const response = await fetch(`http://localhost:3001/chirps/auth/${params.user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            })
            const { feed, likedChirps, retweetedChirps, isFollowing } = await response.json()
            props.onGetFeed(feed, likedChirps, retweetedChirps)
            setIsFollow(isFollowing)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            setError(true)
        }
    }

    const goBackHandler = e => {
        e.preventDefault()
        setIsLoading(true)
        navigate(-1)
    }

    useEffect(() => {
        setIsLoading(true)
        document.title = `@${params.user} / Chirpy`
        window.scrollTo(0, 0);
        if (props.chirps.length > 0) props.clearFeed()
        getUserProfileFeed()
    }, [params.user])

    if (isLoading) {
        return (
            <LoadingFeed />
        )
    }

    if(error) {
        return <span>User not found</span>
    }

    return (
        <>
            <ProfileHeader
                user={params.user}
                chirpCount={props.chirps.length}
                onBackButton={goBackHandler}
            />
            <ProfileSummary 
                myProfile={myProfile}
                user={params.user}
                isFollowing={isFollow}
            />
            <ChirpList
                chirps={props.chirps}
                onDeleteRechirp={props.onDeleteRechirp}
                onRechirp={props.onNewChirp}
                syncFeed={props.syncFeed}
                className={classes['profile__chirps']}
            />

        </>
    )
};

export default Profile;
