import React, { useState } from 'react';

const AuthContext = React.createContext({
    isLogged: false,
    onLogin: () => { },
    onLogout: () => { }
})

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false)

    const loginHandler = () => {
        setIsLogged(true)
    }

    const logoutHandler = () => {
        setIsLogged(false)
    }

    return (
        <AuthContext.Provider value={{
            isLogged,
            onLogin: loginHandler,
            onLogout: logoutHandler
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;