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
const readPositionIsMaster = (position_id) => { return axios.get('/api/admin/position-is-master', { params: { position_id: position_id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createPosition = (data) => { return axios.post('/api/admin/position', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updatePosition = (data) => { return axios.put('/api/admin/position', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deletePosition = (id) => { return axios.delete('/api/admin/position', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

// CRUD Position Role
const readPositionRole = (currentPage, currentLimit, positionId) => { return axios.get('/api/admin/position-role', { params: { page: currentPage, limit: currentLimit, position_id: positionId }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const readPositionRoleReverse = (currentPage, currentLimit, positionId) => { return axios.get('/api/admin/position-role-reverse', { params: { page: currentPage, limit: currentLimit, position_id: positionId }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createPositionRole = (data) => { return axios.post('/api/admin/position-role', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deletePositionRole = (id) => { return axios.delete('/api/admin/position-role', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

// CRUD Role
const readRole = (currentPage, currentLimit) => { return axios.get('/api/admin/role', { params: { page: currentPage, limit: currentLimit }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createRole = (data) => { return axios.post('/api/admin/role', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updateRole = (data) => { return axios.put('/api/admin/role', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deleteRole = (id) => { return axios.delete('/api/admin/role', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

// CRUD Address
const readAddress = (userId, currentPage, currentLimit) => { return axios.get('/api/admin/address', { params: { page: currentPage, limit: currentLimit, user_id: userId }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

export {
  createUser, readUser, updateUser, deleteUser,
  createPosition, readPosition, updatePosition, deletePosition, readPositionIsMaster,
  createPositionRole, readPositionRole, deletePositionRole, readPositionRoleReverse,
  createRole, readRole, updateRole, deleteRole,
  readAddress
}