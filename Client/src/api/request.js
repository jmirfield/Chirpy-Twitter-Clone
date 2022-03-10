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

export const signup = (body) => API.post('users/new', body)
export const login = (body) => API.post('users/login', body)
export const persistentLogin = () => API.get('users/auth')
export const logout = () => API.post('users/logout')

export const getMainFeed = (query) => API.get(`chirps/feed/${query}`)
export const newChirp = (content) => API.post('chirps', content)
export const newChirpWithImage = (content) => API.post('chirps/image', content, { headers: { 'Content-Type': content.type } })
export const getChirp = (id) => API.get(`chirps/${id}`)
export const deleteChirp = (id) => API.delete(`chirps/delete/${id}`)
export const newReply = (content) => API.post('chirps/reply', content)
export const newReplyWithImage = (content) => API.post('chirps/reply/image', content, { headers: { 'Content-Type': content.type } })
export const getReplies = (id, query) => API.get(`chirps/reply/${id}/${query}`)
export const likeChirp = (id) => API.patch('users/like', id)
export const unLikeChirp = (id) => API.patch('users/unlike', id)
export const addRechirp = (req) => API.post('chirps/rechirp', req)
export const deleteRechirp = (id) => API.delete(`chirps/rechirp/delete/${id}`)

export const getUserProfile = (user) => API.get(`users/profile/${user}`)
export const getUserProfileFeed = (id, query) => API.get(`chirps/profile/auth/${id}/${query}`)
export const getUserMedia = (id, query) => API.get(`chirps/profile/media/${id}/${query}`)
export const getUserLikes = (likes, query) => API.post(`chirps/profile/likes/${query}`, likes)
export const followUser = (id) => API.post('relationships/new', id)
export const unfollowUser = (id) => API.delete('relationships/delete', { data: id })
export const getUserFollowings = (user) => API.get(`users/profile/followings/${user}`)
export const getUserFollowers = (user) => API.get(`users/profile/followers/${user}`)
export const uploadImage = (img) => API.patch('users/profile/upload/pic', img, { headers: { 'Content-Type': img.type } })
export const uploadBanner = (img) => API.patch('users/profile/upload/banner', img, { headers: { 'Content-Type': img.type } })
export const getListOfUsers = (search) => API.get(`users/search/${search}`)
export const getRecommendedFollowers = () => API.get('users/recommended')