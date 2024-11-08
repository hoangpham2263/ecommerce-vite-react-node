import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_API_URL

axios.defaults.baseURL = baseUrl

// User
const readUser = (currentPage, currentLimit) => { return axios.get('/api/user', { params: { page: currentPage, limit: currentLimit } }) }

const readCart = (userId, currentPage, currentLimit) => { return axios.get('/api/cart', { params: { userId: userId, page: currentPage, limit: currentLimit }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const readCartAmount = (userId) => { return axios.get('/api/cart-amount', { params: { userId: userId }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const addCart = (data) => { return axios.post('/api/cart', { data }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }
const deleteCart = (ids) => { return axios.delete('/api/cart', { data: { ids }, headers: { 'Content-Type': 'application/json' }, withCredentials: true }) }

const readImage = (currentPage, currentLimit) => { return axios.get('/api/image', { params: { page: currentPage, limit: currentLimit } }) }
const createImage = (data) => { return axios.post('/api/image', { data }) }
const updateImage = (data) => { return axios.put('/api/image', { data }) }
const deleteImage = (id) => { return axios.delete('/api/image', { data: { id } }) }


const readAddress = (userId, currentPage, currentLimit) => { return axios.get('/api/address', { params: { page: currentPage, limit: currentLimit, user_id: userId } }) }
const readProduct = (currentPage, currentLimit) => { return axios.get('/api/product', { params: { page: currentPage, limit: currentLimit } }) }
const readProductDetail = (slug) => { return axios.get(`/api/product/${slug}`) }
const readColorDetail = (id) => { return axios.get(`/api/color/${id}`) }
const readColor = (currentPage, currentLimit) => { return axios.get('/api/color', { params: { page: currentPage, limit: currentLimit } }) }
const readCapacity = (currentPage, currentLimit) => { return axios.get('/api/capacity', { params: { page: currentPage, limit: currentLimit } }) }
const readRam = (currentPage, currentLimit) => { return axios.get('/api/ram', { params: { page: currentPage, limit: currentLimit } }) }
const readCategory = (currentPage, currentLimit) => { return axios.get('/api/category', { params: { page: currentPage, limit: currentLimit } }) }
const readBrand = (currentPage, currentLimit, categoryId) => { return axios.get('/api/brand', { params: { page: currentPage, limit: currentLimit, category_id: categoryId } }) }
const readVersion = (currentPage, currentLimit, brandId) => { return axios.get('/api/version', { params: { page: currentPage, limit: currentLimit, brand_id: brandId } }) }

export {
  readCart, addCart, deleteCart, readCartAmount,
  createImage, readImage, updateImage, deleteImage,
  readUser, readProduct, readProductDetail, readColorDetail, readColor, readCapacity, readRam, readCategory, readBrand, readVersion, readAddress
}