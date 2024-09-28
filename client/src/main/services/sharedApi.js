import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_API_URL
const apiGoogleClientId = import.meta.env.VITE_API_GOOGLE_CLIENT_ID

// login with google
const confirmGetToken = (response) => {return axios.post(`${baseUrl}/api/auth/google`, { code: response.code })}
const getInfoAccountUseAccessToke = (accessToken) => {return axios.get(`${apiGoogleClientId}`, { headers: { Authorization: `Bearer ${accessToken}` } })}
const saveAccountToServer = (data) => {return axios.post(`${baseUrl}/api/auth/google/create`, { data: data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })}

// login basic
const loginAccountBasic = (data) => { return axios.post(`${baseUrl}/api/user/login`, { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const registerAccountBasic = (data) => { return axios.post(`${baseUrl}/api/user/register`, { data }) }
// const logoutAccount = (data) => { return axios.post('/api/v1/user/logout', { data }) }
// const readJWT = (currentPage, currentLimit) => { return axios.get('/api/v1/user/jwt-token') }

export {
  confirmGetToken, getInfoAccountUseAccessToke, saveAccountToServer,
  loginAccountBasic, registerAccountBasic
}