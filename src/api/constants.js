export const API_URL = 'http://localhost:3001/';
export const NO_AUTH_HEADER = { 'Content-Type': 'application/json' };
export const AUTH_HEADER = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.jwt}`
}