import axios from 'axios'

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// CRUD User
const readUser = (data) => { return authAxios.get('/api/admin/user', { params: data }) }
const createUser = (data) => { return authAxios.post('/api/admin/user', { data }) }
const updateUser = (data) => { return authAxios.put('/api/admin/user', { data }) }
const deleteUser = (id) => { return authAxios.delete('/api/admin/user', { data: { id } }) }

// CRUD Position
const readPosition = (currentPage, currentLimit) => { return authAxios.get('/api/admin/position', { params: { page: currentPage, limit: currentLimit } }) }
const readPositionIsMaster = (position_id) => { return authAxios.get('/api/admin/position-is-master', { params: { position_id: position_id } }) }
const createPosition = (data) => { return authAxios.post('/api/admin/position', { data }) }
const updatePosition = (data) => { return authAxios.put('/api/admin/position', { data }) }
const deletePosition = (id) => { return authAxios.delete('/api/admin/position', { data: { id } }) }

// CRUD Position Role
const readPositionRole = (currentPage, currentLimit, positionId) => { return authAxios.get('/api/admin/position-role', { params: { page: currentPage, limit: currentLimit, position_id: positionId } }) }
const readPositionRoleReverse = (currentPage, currentLimit, positionId) => { return authAxios.get('/api/admin/position-role-reverse', { params: { page: currentPage, limit: currentLimit, position_id: positionId } }) }
const createPositionRole = (data) => { return authAxios.post('/api/admin/position-role', { data }) }
const deletePositionRole = (id) => { return authAxios.delete('/api/admin/position-role', { data: { id } }) }

// CRUD Role
const readRole = (currentPage, currentLimit) => { return authAxios.get('/api/admin/role', { params: { page: currentPage, limit: currentLimit } }) }
const createRole = (data) => { return authAxios.post('/api/admin/role', { data }) }
const updateRole = (data) => { return authAxios.put('/api/admin/role', { data }) }
const deleteRole = (id) => { return authAxios.delete('/api/admin/role', { data: { id } }) }

// CRUD Address
const readAddress = (data) => { return authAxios.get('/api/admin/address', { params: data }) }

// CRUD Product
const readProduct = ({ categoryId = null, brandId = null, versionId = null, ids = [], currentPage = 1, currentLimit = 10 }) => { return authAxios.get('/api/admin/product', { params: { categoryId, brandId, versionId, ids, page: currentPage, limit: currentLimit } }) }
const createProduct = (data) => { return authAxios.post('/api/admin/product', { data }) }
const updateProduct = (data) => { return authAxios.put('/api/admin/product', { data }) }
const updateProductStatus = (data) => { return authAxios.put('/api/admin/product-status', { data }) }
const deleteProduct = (id) => { return authAxios.delete('/api/admin/product', { data: { id } }) }

// CRUD Config
const readConfig = ({ productId = null }) => { return authAxios.get('/api/admin/config', { params: { productId } }) }
const createConfig = (data) => { return authAxios.post('/api/admin/config', { data }) }
const updateConfig = (data) => { return authAxios.put('/api/admin/config', { data }) }
// const updateConfigStatus = (data) => { return authAxios.put('/api/admin/product-status', { data }) }
// const deleteConfig = (id) => { return authAxios.delete('/api/admin/product', { data: { id }}) }

// CRUD Image
const readImage = (data) => { return authAxios.get('/api/admin/image', { params: data }) }
const createImage = (data) => { return authAxios.post('/api/admin/image', { data }) }
const updateImage = (data) => { return authAxios.put('/api/admin/image', { data }) }
const deleteImage = (id) => { return authAxios.delete('/api/admin/image', { data: { id } }) }

// CRUD Color
const readColorDetail = (id) => { return authAxios.get(`/api/admin/color/${id}`) }
const readColor = (currentPage, currentLimit) => { return authAxios.get('/api/admin/color', { params: { page: currentPage, limit: currentLimit } }) }
const createColor = (data) => { return authAxios.post('/api/admin/color', { data }) }
const updateColor = (data) => { return authAxios.put('/api/admin/color', { data }) }
const deleteColor = (id) => { return authAxios.delete('/api/admin/color', { data: { id } }) }


// CRUD Capacity
const readCapacity = (currentPage, currentLimit) => { return authAxios.get('/api/admin/capacity', { params: { page: currentPage, limit: currentLimit } }) }
const createCapacity = (data) => { return authAxios.post('/api/admin/capacity', { data }) }
const updateCapacity = (data) => { return authAxios.put('/api/admin/capacity', { data }) }
const deleteCapacity = (id) => { return authAxios.delete('/api/admin/capacity', { data: { id } }) }


// CRUD Ram
const readRam = (currentPage, currentLimit) => { return authAxios.get('/api/admin/ram', { params: { page: currentPage, limit: currentLimit } }) }
const createRam = (data) => { return authAxios.post('/api/admin/ram', { data }) }
const updateRam = (data) => { return authAxios.put('/api/admin/ram', { data }) }
const deleteRam = (id) => { return authAxios.delete('/api/admin/ram', { data: { id } }) }

// CRUD Category
const readCategory = (currentPage, currentLimit) => { return authAxios.get('/api/admin/category', { params: { page: currentPage, limit: currentLimit } }) }
const createCategory = (data) => { return authAxios.post('/api/admin/category', { data }) }
const updateCategory = (data) => { return authAxios.put('/api/admin/category', { data }) }
const deleteCategory = (id) => { return authAxios.delete('/api/admin/category', { data: { id } }) }

// CRUD Brand
const readBrand = (currentPage, currentLimit, categoryId) => { return authAxios.get('/api/admin/brand', { params: { page: currentPage, limit: currentLimit, category_id: categoryId } }) }
const createBrand = (data) => { return authAxios.post('/api/admin/brand', { data }) }
const updateBrand = (data) => { return authAxios.put('/api/admin/brand', { data }) }
const deleteBrand = (id) => { return authAxios.delete('/api/admin/brand', { data: { id } }) }

// CRUD Version
const readVersion = (currentPage, currentLimit, brandId) => { return authAxios.get('/api/admin/version', { params: { page: currentPage, limit: currentLimit, brand_id: brandId } }) }
const createVersion = (data) => { return authAxios.post('/api/admin/version', { data }) }
const updateVersion = (data) => { return authAxios.put('/api/admin/version', { data }) }
const deleteVersion = (id) => { return authAxios.delete('/api/admin/version', { data: { id } }) }

// CRUD Order
const readOrder = (currentPage, currentLimit, brandId) => { return authAxios.get('/api/admin/order', { params: { page: currentPage, limit: currentLimit, brand_id: brandId } }) }
const createOrder = (data) => { return authAxios.post('/api/admin/order', { data }) }
const updateOrder = (data) => { return authAxios.put('/api/admin/order', { data }) }
const deleteOrder = (id) => { return authAxios.delete('/api/admin/order', { data: { id } }) }


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