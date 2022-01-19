import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    user: '',
    error: '',
    loading: false,
    login: () => { },
    logout: () => { }
})


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('jwt') && !isLogged) {
            setLoading(true)
            authPersistentLogin()
        }
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
            console.log('ERROR')
        }
    }

    const logoutRequest = async () => {
        try {
            await fetch("http://localhost:3001/users/logout", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(localStorage)
            })
            setUser('')
            setIsLogged(false)
        } catch (e) {
            console.log('ERROR')
        }
    }


    const authPersistentLogin = async () => {
        try {
            const response = await fetch("http://localhost:3001/users/auth", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(localStorage)

            })
            const data = await response.json()
            if(data.error)localStorage.removeItem('jwt')
            setUser(data.username)
            setLoading(false)
            setIsLogged(true)
        } catch (e) {
            console.log('ERROR')
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

    return (
        <AuthContext.Provider value={{
            user: user,
            loading: loading,
            onLogin: loginHandler,
            onLogout: logoutHandler
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;