import { API_URL, NO_AUTH_HEADER, AUTH_HEADER } from "./constants"

export const request = {
    login: async (body) => {
        const response = await fetch(`${API_URL}users/login`,
            {
                headers: NO_AUTH_HEADER,
                method: 'POST',
                body: JSON.stringify(body)
            })
        return await response.json()
    },
    persistentLogin: async () => {
        const response = await fetch(`${API_URL}users/auth`,
            {
                headers: AUTH_HEADER,
                method: 'GET'
            })
        return await response.json()
    },
    getMainFeed: async () => {
        const response = await fetch(`${API_URL}chirps/feed`,
            {
                headers: AUTH_HEADER,
                method: 'GET'
            })
        return await response.json()
    },
    getUserProfile: async (user) => {
        const response = await fetch(`${API_URL}users/profile/${user}`,
            {
                headers: AUTH_HEADER,
                method: 'GET'
            })
        return await response.json()
    },
    getUserProfileFeed: async (user) => {
        const response = await fetch(`${API_URL}chirps/auth/${user}`,
            {
                headers: AUTH_HEADER,
                method: 'GET'
            })
        return await response.json()
    },
    followUser: async (id) => {
        await fetch(`${API_URL}relationships/new`,
            {
                headers: AUTH_HEADER,
                method: 'POST',
                body: JSON.stringify({ id: id })
            })
    },
    unfollowUser: async (id) => {
        await fetch(`${API_URL}relationships/delete`,
            {
                headers: AUTH_HEADER,
                method: 'DELETE',
                body: JSON.stringify({ id: id })
            })
    },
    likeChirp: async (id) => {
        await fetch(`${API_URL}users/like`,
            {
                headers: AUTH_HEADER,
                method: 'PATCH',
                body: JSON.stringify({ _id: id })
            })
    },
    unLikeChirp: async (id) => {
        await fetch(`${API_URL}users/unlike`,
            {
                headers: AUTH_HEADER,
                method: 'PATCH',
                body: JSON.stringify({ _id: id })
            })
    },
    rechirp: async (req) => {
        const response = await fetch(`${API_URL}chirps/rechirp`,
            {
                headers: AUTH_HEADER,
                method: 'POST',
                body: JSON.stringify(req)
            })
        return await response.json()
    },
    deleteRechirp: async (req) => {
        await fetch(`${API_URL}chirps/rechirp/delete`,
            {
                headers: AUTH_HEADER,
                method: 'DELETE',
                body: JSON.stringify({ _id: req })
            })
    }
}