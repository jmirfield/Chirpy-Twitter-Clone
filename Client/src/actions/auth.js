import { login, persistentLogin, logout, signup } from "../api/request"

export const signupRequest = async ({ username, password, email }, dispatch) => {
    try {
        const { data } = await signup({ username: username.trim(), password, email: email.trim() })
        localStorage.setItem('jwt', data.token)
        dispatch({
            type: 'LOGIN',
            payload: {
                username: data.user.username,
                profileImage: ''
            }
        })
    } catch (e) {
        dispatch({ type: 'ERROR' })
        console.log('Error with signing up')
    }
}

export const loginRequest = async ({ username, password }, dispatch) => {
    try {
        const { data } = await login({ username, password })
        localStorage.setItem('jwt', data.token)
        dispatch({
            type: 'LOGIN',
            payload: {
                username: data.username,
                profileImage: data.pic
            }
        })
    } catch (e) {
        dispatch({ type: 'ERROR' })
        console.log('Error with logging in')
    }
}

export const authPersistentLoginRequest = async (dispatch) => {
    try {
        const { data } = await persistentLogin()
        dispatch({
            type: 'LOGIN',
            payload: {
                username: data.username,
                profileImage: data.pic
            }
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