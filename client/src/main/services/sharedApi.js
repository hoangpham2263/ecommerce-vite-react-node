import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_API_URL
const apiGoogleClientId = import.meta.env.VITE_API_GOOGLE_CLIENT_ID

axios.defaults.baseURL = baseUrl

// login with google
const confirmGetToken = (response) => { return axios.post('/api/auth/google', { code: response.code }) }
const getInfoAccountUseAccessToke = (accessToken) => { return axios.get(`${apiGoogleClientId}`, { headers: { Authorization: `Bearer ${accessToken}` }, withCredentials: false }) }
const saveAccountToServer = (data) => { return axios.post('/api/auth/google/create', { data: data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

// login basic
const loginAccountBasic = (data) => { return axios.post('/api/auth/login', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const registerAccountBasic = (data) => { return axios.post('/api/auth/register', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const logoutAccount = () => { return axios.post('/api/auth/logout', {}, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const readProfileJWT = () => { return axios.get('/api/auth/jwt-token', { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

export {
  confirmGetToken, getInfoAccountUseAccessToke, saveAccountToServer,
  loginAccountBasic, registerAccountBasic, logoutAccount, readProfileJWT
}