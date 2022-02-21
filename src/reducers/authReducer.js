export const initialState = {
    user: '',
    error: null,
    isLoading: true,
    isLogged: false
}

export const reducer = (state, action) => {
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