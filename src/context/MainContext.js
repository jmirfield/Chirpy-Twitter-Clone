import React, { useState, useEffect } from 'react';

const MainContext = React.createContext({
    user: '',
    error: '',
    onRemoveError: () => { },
    isLoading: true,
    isLogged: false,
    onLogin: () => { },
    onLogout: () => { },
    chirps: [],
    onGetFeed: () => { },
    onClearFeed: () => { },
    onAddChirp: () => { },
    onReset: () => { }
})

export const MainProvider = ({ children }) => {

    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [isLogged, setIsLogged] = useState(false)
    const [chirps, setChirps] = useState([])

    useEffect(() => {
        authPersistentLogin()
    }, [])

    const loginRequest = async (username, password) => {
        try {
            const response = await fetch("http://localhost:3001/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const data = await response.json()
            localStorage.setItem('jwt', data.token)
            setError()
            setUser(data.user.username)
            setLoading(false)
            setIsLogged(true)
        } catch (e) {
            setError(e.message)
            setLoading(false)
            console.log('ERROR')
        }
    }

    const logoutRequest = async () => {
        try {
            await fetch("http://localhost:3001/users/logout", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            })
            localStorage.removeItem('jwt')
            resetHandler()
        } catch (e) {
            console.log('ERROR')
            console.log(e)
        }
    }


    const authPersistentLogin = async () => {
        if (localStorage.getItem('jwt') && !isLogged) {
            try {
                const response = await fetch("http://localhost:3001/users/auth", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    }
                })
                const data = await response.json()
                if (data.error) {
                    localStorage.removeItem('jwt')
                    resetHandler()
                    return
                }
                setUser(data.username)
                setIsLogged(true)
                setLoading(false)
            } catch (e) {
                console.log('ERROR')
            }
        } else {
            setLoading(false)
        }
    }

    const loginHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        loginRequest(e.target[0].value, e.target[1].value)
    }

    const logoutHandler = () => {
        logoutRequest()
    }

    const getFeedHandler = (feed, likedChirps, retweetedChirps) => {
        const chirpArr = feed.map(chirp => {
            let isLiked;
            let isRechirped = false;
            if(chirp.rechirp) {
                isLiked = likedChirps.includes(chirp.rechirp.original_id) 
            } else {
                isLiked = likedChirps.includes(chirp._id)
                isRechirped = retweetedChirps.includes(chirp._id)
            }
            return { ...chirp, isLiked, isRechirped }
        })
        setChirps(chirpArr)
    }

    const addChirpHandler = (chirp) => {
        setChirps((prevChirps) => {
            return [chirp, ...prevChirps]
        })
    }

    const removeErrorHandler = () => {
        setError('')
    }

    const clearFeedHandler = () => {
        setChirps([])
    }

    const resetHandler = () => {
        setUser('')
        setError('')
        setLoading(false)
        setIsLogged(false)
        setChirps([])
    }

    return (
        <MainContext.Provider value={{
            user,
            error,
            onRemoveError: removeErrorHandler,
            isLoading,
            isLogged,
            onLogin: loginHandler,
            onLogout: logoutHandler,
            chirps,
            onGetFeed: getFeedHandler,
            onClearFeed: clearFeedHandler,
            onAddChirp: addChirpHandler,
            onReset: resetHandler
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;