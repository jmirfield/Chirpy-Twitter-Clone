import React, { useEffect, useReducer } from 'react';

const MainContext = React.createContext({
    state: {},
    dispatch: () => { }
})

const initialState = {
    user: '',
    error: null,
    isLoading: true,
    isLogged: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                isLogged: true
            }
        case 'ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case 'REMOVE_ERROR':
            return {
                ...state,
                error: null
            }
        case 'START_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'DONE_LOADING':
            return {
                ...state,
                isLoading: false
            }
        case 'RESET':
            return {
                user: '',
                error: null,
                isLoading: false,
                isLogged: false
            }
        default:
            return state
    }
}

export const MainProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        authPersistentLogin()
    }, [])

    const authPersistentLogin = async () => {
        if (localStorage.getItem('jwt') && !state.isLogged) {
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
        <MainContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;