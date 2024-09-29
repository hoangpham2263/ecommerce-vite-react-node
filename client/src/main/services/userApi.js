import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_API_URL
const apiGoogleClientId = import.meta.env.VITE_API_GOOGLE_CLIENT_ID

axios.defaults.baseURL = baseUrl

const a = (accessToken) => {return axios.get(`${apiGoogleClientId}`, { headers: { Authorization: `Bearer ${accessToken}` }, withCredentials: false })}
// const readJWT = (currentPage, currentLimit) => { return axios.get('/api/v1/user/jwt-token') }

export {
}