import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_API_URL

axios.defaults.baseURL = baseUrl

// CRUD User
const readUser = (currentPage, currentLimit) => { return axios.get('/api/user', { params: { page: currentPage, limit: currentLimit } }) }

// CRUD Address
const readAddress = (userId, currentPage, currentLimit) => { return axios.get('/api/address', { params: { page: currentPage, limit: currentLimit, user_id: userId } }) }

// CRUD Product
const readProduct = (currentPage, currentLimit) => { return axios.get('/api/product', { params: { page: currentPage, limit: currentLimit } }) }

// CRUD Image
const readImage = (currentPage, currentLimit) => { return axios.get('/api/image', { params: { page: currentPage, limit: currentLimit } }) }
const createImage = (data) => { return axios.post('/api/image', { data }) }
const updateImage = (data) => { return axios.put('/api/image', { data }) }
const deleteImage = (id) => { return axios.delete('/api/image', { data: { id } }) }

// CRUD Color
const readColorDetail = (id) => { return axios.get(`/api/color/${id}`) }
const readColor = (currentPage, currentLimit) => { return axios.get('/api/color', { params: { page: currentPage, limit: currentLimit } }) }

// CRUD Capacity
const readCapacity = (currentPage, currentLimit) => { return axios.get('/api/capacity', { params: { page: currentPage, limit: currentLimit } }) }

// CRUD Ram
const readRam = (currentPage, currentLimit) => { return axios.get('/api/ram', { params: { page: currentPage, limit: currentLimit } }) }

// CRUD Category
const readCategory = (currentPage, currentLimit) => { return axios.get('/api/category', { params: { page: currentPage, limit: currentLimit } }) }

// CRUD Brand
const readBrand = (currentPage, currentLimit, categoryId) => { return axios.get('/api/brand', { params: { page: currentPage, limit: currentLimit, category_id: categoryId } }) }

// CRUD Version
const readVersion = (currentPage, currentLimit, brandId) => { return axios.get('/api/version', { params: { page: currentPage, limit: currentLimit, brand_id: brandId } }) }

export {
  readUser, readProduct, readColorDetail, createImage, readImage, updateImage, deleteImage, readColor, readCapacity, readRam, readCategory, readBrand, readVersion, readAddress
}