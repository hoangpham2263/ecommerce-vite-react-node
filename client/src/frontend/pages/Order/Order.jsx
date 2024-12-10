import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Order.module.scss'
import config from '../../config'
import { addCart, deleteCart, readCart, readOrder } from '../../services/publicApi'
import useFetchAmountCart from '../../hooks/useFetchAmountCart'
import { useAuth } from '../../../main/context/AuthContext'

const cx = classNames.bind(styles)
const Order = () => {
  // ---------- init variable ----------
  const navigate = useNavigate()
  const { user } = useAuth()
  const LocalStorageGetInfos = user
  const [carts, setCarts] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  // ---------- call api ----------
  const handleFetchCarts = async () => {
    let data = { user_id: LocalStorageGetInfos?.user?.id }
    const fetchCartsByUser = await readCart(data)
    const getAllCarts = fetchCartsByUser?.data?.data
    setCarts(getAllCarts)
    data = { user_id: LocalStorageGetInfos?.user?.id }
    const fetchOrdersByUser = await readOrder(data)
    setCarts(fetchOrdersByUser?.data?.data)
  }
  useEffect(() => { handleFetchCarts() }, [])

  const fetchAmountCart = useFetchAmountCart()
  useEffect(() => { fetchAmountCart() }, [])

  // ---------- quantity ----------
  const handleDecreaseQuantityCart = async (item) => {
    try {
      const data = {
        ProductId: item?.Product?.id,
        quantity: item?.quantity > 1 ? item?.quantity - 1 : item.quantity,
        config_id: item?.config_id
      }
      const fetchCart = await addCart(data)
      handleFetchCarts()
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  const handleIncreaseQuantityCart = async (item) => {
    try {
      const data = {
        ProductId: item?.Product?.id,
        quantity: item?.quantity + 1,
        config_id: item?.config_id
      }
      const fetchCart = await addCart(data)
      handleFetchCarts()
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  // ---------- select ----------
  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    )
  }
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(carts.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }
  // ---------- delete ----------
  const handleDeleteCart = async (item) => {
    const ids = [item?.id]
    const fetchCart = await deleteCart(ids)
    if (fetchCart?.data?.code === 0) {
      handleFetchCarts()
      fetchAmountCart()
      toast.success('Đã xóa sản phẩm thành công')
    }
  }

  const handleDeleteMultiple = async () => {
    if (selectedItems.length > 0) {
      const ids = selectedItems
      const fetchCart = await deleteCart(ids)
      if (fetchCart?.data?.code === 0) {
        handleFetchCarts()
        fetchAmountCart()
        toast.success('Đã xóa sản phẩm thành công')
      }
    } else {
      toast.error('Vui lòng chọn ít nhất 1 sản phẩm')
    }
  }

  // ---------- buy ----------
  const handleBuyOne = (item) => {
    localStorage.setItem('dataCheckout', JSON.stringify([item?.id]))
    navigate(config.routes.checkout)
  }
  const handleBuyMultiple = () => {
    if (selectedItems.length > 0) {
      localStorage.setItem('dataCheckout', JSON.stringify(selectedItems))
      navigate(config.routes.checkout)
    } else {
      toast.error('Vui lòng chọn ít nhất 1 sản phẩm')
    }
  }

  const formatNumber = (number) => { return number.toLocaleString('vi-VN') }

  // ---------- render ----------
  return (
    <div className={cx('cs-bg-color')}>
      {carts.length > 0 ? <div className='container'>
        <div className='row'>
          <div className='col-3'></div>
          <div className='col-9'>
            <div className={cx('pt-4', 'cs-wrapper')}>
              <div className={cx('d-flex justify-content-between bg-white', 'cs-bl-title')}>
                <div className={cx('fw-normal d-flex justify-content-center align-items-center py-3', 'cs-title-item', 'cs-title-item-active')}>Tất cả</div>
                <div className={cx('fw-normal d-flex justify-content-center align-items-center py-3', 'cs-title-item')}>Chờ thanh toán</div>
                <div className={cx('fw-normal d-flex justify-content-center align-items-center py-3', 'cs-title-item')}>Vận chuyển</div>
                <div className={cx('fw-normal d-flex justify-content-center align-items-center py-3', 'cs-title-item')}>Chờ giao hàng</div>
                <div className={cx('fw-normal d-flex justify-content-center align-items-center py-3', 'cs-title-item')}>Hoàn thành</div>
                <div className={cx('fw-normal d-flex justify-content-center align-items-center py-3', 'cs-title-item')}>Đã hủy</div>
                <div className={cx('fw-normal d-flex justify-content-center align-items-center py-3', 'cs-title-item')}>Trả hàng/Hoàn tiền</div>
              </div>
              <div className={cx('mt-3 w-100', 'cs-bl-item')}>
                <div>
                  <div className={cx('d-flex align-items-center justify-content-between w-100')}>
                    <div className={cx('d-flex')}>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                    </div>
                    <div className={cx('d-flex')}>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                    </div>
                  </div>
                  <div className={cx('d-flex align-items-center justify-content-between w-100')}>
                    <div className={cx('d-flex')}>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                    </div>
                    <div className={cx('d-flex')}>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={cx('d-flex align-items-center justify-content-between w-100')}>
                    <div className={cx('d-flex')}>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                    </div>
                    <div className={cx('d-flex')}>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                    </div>
                  </div>
                  <div className={cx('d-flex align-items-center justify-content-between w-100')}>
                    <div className={cx('d-flex')}>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                    </div>
                    <div className={cx('d-flex')}>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                      <div className={cx('cs-title')}>Laura.Beauty</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> : <div className={cx('no-cart')}><img src='https://res.cloudinary.com/dqhj1sukr/image/upload/v1730960241/uploadLocal_ecommerce/cart.png' /></div>
      }
    </div>
  )
}
export default Order

