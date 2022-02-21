import { login, persistentLogin, logout } from "../api/request"

export const loginRequest = async (username, password, dispatch) => {
    try {
        const { data } = await login({ username, password })
        localStorage.setItem('jwt', data.token)
        dispatch({
            type: 'LOGIN',
            payload: data.user.username
        })
    } catch (e) {
        dispatch({
            type: 'ERROR',
            payload: true
        })
        console.log('Error with logging in')
    }
}

export const authPersistentLoginRequest = async (dispatch) => {
    try {
        const { data } = await persistentLogin()
        dispatch({
            type: 'LOGIN',
            payload: data.username
        })
    } catch (e) {
        console.log('Error with logging in')
        localStorage.removeItem('jwt')
        dispatch({ type: 'RESET' })
    }
}

export const logoutRequest = async (dispatch) => {
    try {
        await logout()
        localStorage.removeItem('jwt')
        dispatch({ type: 'RESET' })
    } catch (e) {
        console.log('Error with logging out')
    }
}