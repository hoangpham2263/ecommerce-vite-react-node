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

// CRUD Product
const readProduct = ({ categoryId = null, brandId = null, versionId = null, ids = [], currentPage = 1, currentLimit = 10 }) => { return axios.get('/api/admin/product', { params: { categoryId, brandId, versionId, ids, page: currentPage, limit: currentLimit }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createProduct = (data) => { return axios.post('/api/admin/product', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updateProduct = (data) => { return axios.put('/api/admin/product', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updateProductStatus = (data) => { return axios.put('/api/admin/product-status', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deleteProduct = (id) => { return axios.delete('/api/admin/product', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

// CRUD Config
const readConfig = ({ productId = null }) => { return axios.get('/api/admin/config', { params: { productId }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createConfig = (data) => { return axios.post('/api/admin/config', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updateConfig = (data) => { return axios.put('/api/admin/config', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
// const updateConfigStatus = (data) => { return axios.put('/api/admin/product-status', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
// const deleteConfig = (id) => { return axios.delete('/api/admin/product', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

// CRUD Image
const readImage = (currentPage, currentLimit) => { return axios.get('/api/admin/image', { params: { page: currentPage, limit: currentLimit }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createImage = (data) => { return axios.post('/api/admin/image', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updateImage = (data) => { return axios.put('/api/admin/image', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deleteImage = (id) => { return axios.delete('/api/admin/image', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

// CRUD Color
const readColorDetail = (id) => { return axios.get(`/api/admin/color/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const readColor = (currentPage, currentLimit) => { return axios.get('/api/admin/color', { params: { page: currentPage, limit: currentLimit }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createColor = (data) => { return axios.post('/api/admin/color', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updateColor = (data) => { return axios.put('/api/admin/color', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deleteColor = (id) => { return axios.delete('/api/admin/color', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }


// CRUD Capacity
const readCapacity = (currentPage, currentLimit) => { return axios.get('/api/admin/capacity', { params: { page: currentPage, limit: currentLimit }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createCapacity = (data) => { return axios.post('/api/admin/capacity', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updateCapacity = (data) => { return axios.put('/api/admin/capacity', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deleteCapacity = (id) => { return axios.delete('/api/admin/capacity', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }


// CRUD Ram
const readRam = (currentPage, currentLimit) => { return axios.get('/api/admin/ram', { params: { page: currentPage, limit: currentLimit }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createRam = (data) => { return axios.post('/api/admin/ram', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updateRam = (data) => { return axios.put('/api/admin/ram', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deleteRam = (id) => { return axios.delete('/api/admin/ram', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

// CRUD Category
const readCategory = (currentPage, currentLimit) => { return axios.get('/api/admin/category', { params: { page: currentPage, limit: currentLimit }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createCategory = (data) => { return axios.post('/api/admin/category', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updateCategory = (data) => { return axios.put('/api/admin/category', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deleteCategory = (id) => { return axios.delete('/api/admin/category', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

// CRUD Brand
const readBrand = (currentPage, currentLimit, categoryId) => { return axios.get('/api/admin/brand', { params: { page: currentPage, limit: currentLimit, category_id: categoryId }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createBrand = (data) => { return axios.post('/api/admin/brand', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updateBrand = (data) => { return axios.put('/api/admin/brand', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deleteBrand = (id) => { return axios.delete('/api/admin/brand', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

// CRUD Version
const readVersion = (currentPage, currentLimit, brandId) => { return axios.get('/api/admin/version', { params: { page: currentPage, limit: currentLimit, brand_id: brandId }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createVersion = (data) => { return axios.post('/api/admin/version', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updateVersion = (data) => { return axios.put('/api/admin/version', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deleteVersion = (id) => { return axios.delete('/api/admin/version', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

// CRUD Order
const readOrder = (currentPage, currentLimit, brandId) => { return axios.get('/api/admin/order', { params: { page: currentPage, limit: currentLimit, brand_id: brandId }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const createOrder = (data) => { return axios.post('/api/admin/order', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const updateOrder = (data) => { return axios.put('/api/admin/order', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deleteOrder = (id) => { return axios.delete('/api/admin/order', { data: { id }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }


export {
  createUser, readUser, updateUser, deleteUser,
  createPosition, readPosition, updatePosition, deletePosition, readPositionIsMaster,
  createPositionRole, readPositionRole, deletePositionRole, readPositionRoleReverse,
  createRole, readRole, updateRole, deleteRole,
  createProduct, readProduct, updateProduct, deleteProduct, updateProductStatus, readColorDetail,
  createConfig, readConfig, updateConfig,
  createImage, readImage, updateImage, deleteImage,
  createColor, readColor, updateColor, deleteColor,
  createCapacity, readCapacity, updateCapacity, deleteCapacity,
  createRam, readRam, updateRam, deleteRam,
  createCategory, readCategory, updateCategory, deleteCategory,
  createBrand, readBrand, updateBrand, deleteBrand,
  createVersion, readVersion, updateVersion, deleteVersion,
  readAddress,
  readOrder, createOrder, updateOrder, deleteOrder
}