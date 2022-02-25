import React, { useEffect, useReducer } from 'react';
import { initialState, reducer } from '../reducers/authReducer';
import { authPersistentLoginRequest } from '../actions/auth';

const AuthContext = React.createContext({
    state: {},
    dispatch: () => { }
})


export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (localStorage.getItem('jwt') && !state.isLogged) {
            authPersistentLoginRequest(dispatch)
        } else {
            dispatch({ type: 'DONE_LOADING' })
        }
    }, [])



    return (
        <AuthContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;