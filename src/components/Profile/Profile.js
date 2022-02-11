import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import MainContext from '../../context/MainContext';
import Chirps from '../Chirps/Chirps';
import Icon from '../UI/Icon/Icon';
import { BACK_BUTTON } from '../../utils/icon';
import classes from './Profile.module.css'

const Profile = (props) => {

    const params = useParams()
    const navigate = useNavigate()
    const ctx = useContext(MainContext)
    const myProfile = params.user === ctx.user

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

    const goBackHandler = e => {
        e.preventDefault()
        navigate(-1)
    }

    useEffect(() => {
        document.title = `@${params.user} / Chirpy`
        window.scrollTo(0, 0);
        if (props.chirps.length > 0) props.onClearFeed()
        getUserProfileFeed()
    }, [params.user])

    return (
        <>
            <header className={classes['profile__header']}>
                <a href='#' onClick={goBackHandler}>
                    <Icon width='18px' height='18px' fill='white' d={BACK_BUTTON.d} />
                </a>
                <h2>{params.user}</h2>
            </header>
            <section className={classes['profile__summary']}>
                <section className={classes['profile__summary-banner']} />
                <section className={classes['profile__summary-user']}>
                    <section className={classes['profile__summary-picture']} />
                </section>
            </section>
            <section className={classes['profile__chirps']}>
                {props.chirps.length > 0
                    ? <Chirps
                        chirps={props.chirps}
                        onDeleteRechirp={props.onDeleteRechirp}
                        onRechirp={props.onNewChirp}
                        onSyncFeed={props.onSyncFeed}
                    />
                    : <p className={classes['profile__chirps-none']}>No chirps available...</p>}
            </section>
        </>
    )
};

export default Profile;
