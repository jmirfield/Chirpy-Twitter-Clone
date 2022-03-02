export const initialState = {
    user: '',
    profileImage: null,
    error: null,
    isLoading: true,
    isLogged: false
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.username,
                profileImage: action.payload.profileImage,
                isLoading: false,
                isLogged: true
            }
        case 'ERROR':
            return {
                ...state,
                error: true,
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
                profileImage: null,
                error: null,
                isLoading: false,
                isLogged: false
            }
        case 'NEW_PROFILE_PIC':
            return {
                ...state,
                profileImage: action.payload
            }
        default:
            return state
    }
}