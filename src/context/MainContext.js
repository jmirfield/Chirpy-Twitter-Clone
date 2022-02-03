import React, { useState, useEffect, useCallback } from 'react';

const MainContext = React.createContext({
    user: '',
    error: '',
    isLoading: true,
    isLogged: false,
    login: () => { },
    logout: () => { },
    chirps: [],
    onGetFeed: () => { },
    onAddChirp: () => { }
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
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const data = await response.json()
            localStorage.setItem('jwt', data.token)
            setUser(data.user.username)
            setLoading(false)
            setIsLogged(true)
        } catch (e) {
            setError(e.message)
            console.log('ERROR')
        }
    }

    const logoutRequest = async () => {
        try {
            await fetch("http://localhost:3001/users/logout", {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            })
            localStorage.removeItem('jwt')
            setUser('')
            setIsLogged(false)
            setChirps([])
        } catch (e) {
            console.log('ERROR')
        }
    }


    const authPersistentLogin = async () => {
        if (localStorage.getItem('jwt') && !isLogged) {
            try {
                const response = await fetch("http://localhost:3001/users/auth", {
                    method: 'GET', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.jwt}`
                    }
                })
                const data = await response.json()
                if (data.error) {
                    localStorage.removeItem('jwt')
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

    const getFeedHandler = (feed, likedChirps) => {
        const chirpArr = feed.map(chirp => {
            const isLiked = likedChirps.includes(chirp._id)
            return { ...chirp, isLiked }
        })
        setChirps(chirpArr)
    }

    const addChirpHandler = (chirp) => {
        setChirps((prevChirps) => {
            return [chirp, ...prevChirps]
        })
    }

    return (
        <MainContext.Provider value={{
            user,
            error,
            isLoading,
            isLogged,
            onLogin: loginHandler,
            onLogout: logoutHandler,
            chirps,
            onGetFeed: getFeedHandler,
            onAddChirp: addChirpHandler
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;