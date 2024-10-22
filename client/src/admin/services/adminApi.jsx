import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_API_URL

axios.defaults.baseURL = baseUrl

// CRUD User
const readUser = (currentPage, currentLimit) => { return axios.get('/api/admin/user', { params: { page: currentPage, limit: currentLimit }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createUser = (data) => { return axios.post('/api/admin/user', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updateUser = (data) => { return axios.put('/api/admin/user', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deleteUser = (id) => { return axios.delete('/api/admin/user', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

// CRUD Position
const readPosition = (currentPage, currentLimit) => { return axios.get('/api/admin/position', { params: { page: currentPage, limit: currentLimit }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createPosition = (data) => { return axios.post('/api/admin/position', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updatePosition = (data) => { return axios.put('/api/admin/position', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deletePosition = (id) => { return axios.delete('/api/admin/position', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }


// CRUD Address
const readAddress = (userId, currentPage, currentLimit) => { return axios.get('/api/admin/address', { params: { page: currentPage, limit: currentLimit, user_id: userId }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

export {
  createUser, readUser, updateUser, deleteUser,
  createPosition, readPosition, updatePosition, deletePosition,
  readAddress
}