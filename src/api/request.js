import axios from 'axios'
import { API_URL } from "./constants"

const API = axios.create({ baseURL: API_URL })
API.defaults.headers.post['Content-Type'] = 'application/json'
API.defaults.headers.delete['Content-Type'] = 'application/json'
API.defaults.headers.patch['Content-Type'] = 'application/json'

API.interceptors.request.use((req) => {
    if (localStorage.getItem('jwt')) {
        req.headers.common['Authorization'] = `Bearer ${localStorage.jwt}`
    }
    return req
})

export const login = (body) => API.post('users/login', body)
export const persistentLogin = () => API.get('users/auth')
export const logout = () => API.post('users/logout')

export const getMainFeed = () => API.get('chirps/feed')
export const newChirp = (content) => API.post('chirps', content)
export const likeChirp = (id) => API.patch('users/like', id)
export const unLikeChirp = (id) => API.patch('users/unlike', id)
export const addRechirp = (req) => API.post('chirps/rechirp', req)
export const deleteRechirp = (id) => API.delete('chirps/rechirp/delete', { data: id })

export const getUserProfile = (user) => API.get(`users/profile/${user}`)
export const getUserProfileFeed = (user) => API.get(`chirps/auth/${user}`)
export const getUserLikes = (likes) => API.post('chirps/liked', likes)
export const followUser = (id) => API.post('relationships/new', id)
export const unfollowUser = (id) => API.delete('relationships/delete', { data: id })
export const getUserFollowing = (user) => API.get(`users/profile/following/${user}`)