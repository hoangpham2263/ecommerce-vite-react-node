import axios from 'axios'

const defaultAxios = axios.create({
  baseURL: import.meta.env.VITE_API_API_URL
})

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ---------- user ----------
const readUser = (data) => { return axios.get('/api/user', { params: data }) }

// ---------- cart ----------
const readCart = (data) => { return authAxios.get('/api/cart', { params: data }) }
const readCartAmount = () => { return authAxios.get('/api/cart-amount') }
const readCartByIds = (ids) => { return defaultAxios.get('/api/cart-by-ids', { params: { ids: ids } }) }
const addCart = (data) => { return authAxios.post('/api/cart', { data }) }
const updateCart = (ids) => { return authAxios.put('/api/cart', { data: { ids } }) }
const deleteCart = (ids) => { return authAxios.delete('/api/cart', { data: { ids } }) }

// ---------- image ----------
const readImage = (data) => { return defaultAxios.get('/api/image', { params: data }) }
const createImage = (data) => { return defaultAxios.post('/api/image', { data }) }
const updateImage = (data) => { return defaultAxios.put('/api/image', { data }) }
const deleteImage = (id) => { return defaultAxios.delete('/api/image', { data: { id } }) }

// ---------- address ----------
const readAddress = (data) => { return defaultAxios.get('/api/address', { params: data }) }

// ---------- product ----------
const readProduct = (data) => { return defaultAxios.get('/api/product', { params: data }) }
const readProductDetail = (slug) => { return defaultAxios.get(`/api/product/${slug}`) }

// ---------- color ----------
const readColorDetail = (id) => { return defaultAxios.get(`/api/color/${id}`) }
const readColor = (data) => { return defaultAxios.get('/api/color', { params: data }) }
const readCapacity = (data) => { return defaultAxios.get('/api/capacity', { params: data }) }
const readRam = (data) => { return defaultAxios.get('/api/ram', { params: data }) }
const readCategory = (data) => { return defaultAxios.get('/api/category', { params: data }) }
const readBrand = (data) => { return defaultAxios.get('/api/brand', { params: data }) }
const readVersion = (data) => { return defaultAxios.get('/api/version', { params: data }) }
const readConfig = (data) => { return defaultAxios.get('/api/config', { params: data }) }

// CRUD Order
const readOrder = (data) => { return authAxios.get('/api/order', { params: data }) }
const createOrder = (data) => { return authAxios.post('/api/order', { data }) }
const updateOrder = (data) => { return authAxios.put('/api/order', { data }) }
const deleteOrder = (id) => { return authAxios.delete('/api/order', { data: { id } }) }

// Send Mail
const sendMailer = (data) => { return defaultAxios.post('/api/send-mail', { data }) }
const sendMailerContact = (data) => { return defaultAxios.post('/api/send-mail-contact', { data }) }

export {
  readCart, addCart, deleteCart, readCartAmount, readCartByIds, readConfig,updateCart,
  createImage, readImage, updateImage, deleteImage,
  readUser, readProduct, readProductDetail,
  readColorDetail, readColor, readCapacity, readRam, readCategory, readBrand, readVersion, readAddress,
  sendMailer, sendMailerContact,
  readOrder, createOrder, updateOrder, deleteOrder
}