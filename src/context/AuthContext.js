import React, { useEffect, useReducer } from 'react';
import { initialState, reducer } from '../reducers/authReducer';
import { persistentLogin } from '../api/request';

const AuthContext = React.createContext({
    state: {},
    dispatch: () => { }
})


export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        authPersistentLogin()
    }, [])

    const authPersistentLogin = async () => {
        if (localStorage.getItem('jwt') && !state.isLogged) {
            try {
                const data = await persistentLogin()
            if (data.error) {
                localStorage.removeItem('jwt')
                dispatch({ type: 'RESET' })
                return
            }
            dispatch({
                type: 'LOGIN',
                payload: data.username
            })
        } catch (e) {
            dispatch({
                type: 'ERROR',
                payload: true
            })
        }
    } else {
        dispatch({ type: 'DONE_LOADING' })
}
    }



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