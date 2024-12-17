import classNames from 'classnames/bind'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import styles from './Cart.module.scss'
import { addCart, deleteCart, readCart } from '../../services/publicApi'
import { useNavigate } from 'react-router-dom'
import config from '../../config'
import useFetchAmountCart from '../../hooks/useFetchAmountCart'
import { useAuth } from '../../../main/context/AuthContext'

const cx = classNames.bind(styles)
const Cart = () => {
  // ---------- init variable ----------
  const navigate = useNavigate()
  const { user } = useAuth()
  const LocalStorageGetInfos = user
  const [carts, setCarts] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  // ---------- call api ----------
  const handleFetchCarts = async () => {
    const data = { user_id: LocalStorageGetInfos?.user?.id }
    const fetchCartsByUser = await readCart(data)
    const getAllCarts = fetchCartsByUser?.data?.data
    setCarts(getAllCarts)
  }
  useEffect(() => { handleFetchCarts() }, [])

  const fetchAmountCart = useFetchAmountCart()
  useEffect(() => { fetchAmountCart() }, [])

  // ---------- quantity ----------
  const handleDecreaseQuantityCart = async (e, item) => {
    e.stopPropagation() // Ngăn chặn sự kiện nổi lên
    try {
      const data = {
        ProductId: item?.Product?.id,
        quantity: item?.quantity > 1 ? item?.quantity - 1 : item.quantity,
        config_id: item?.config_id
      }
      await addCart(data)
      handleFetchCarts()
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const handleIncreaseQuantityCart = async (e, item) => {
    e.stopPropagation() // Ngăn chặn sự kiện nổi lên
    try {
      const data = {
        ProductId: item?.Product?.id,
        quantity: item?.quantity + 1,
        config_id: item?.config_id
      }
      await addCart(data)
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
  const handleDeleteCart = async (e, item) => {
    e.stopPropagation() // Ngăn chặn sự kiện nổi lên
    try {
      const ids = [item?.id]
      await deleteCart(ids)
      handleFetchCarts()
      fetchAmountCart()
      toast.success('Đã xóa sản phẩm thành công')
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const handleDeleteMultiple = async () => {
    try {
      if (selectedItems.length > 0) {
        const ids = selectedItems
        await deleteCart(ids)
        handleFetchCarts()
        fetchAmountCart()
        toast.success('Đã xóa sản phẩm thành công')
      } else {
        toast.error('Vui lòng chọn ít nhất 1 sản phẩm')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  // ---------- buy ----------
  const handleBuyOne = (e, item) => {
    e.stopPropagation() // Ngăn chặn sự kiện nổi lên
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

  const handleRedirectProductDetail = (slug) => {
    window.location.href = '/' + slug
  }

  const formatNumber = (number) => { return number.toLocaleString('vi-VN') }

  return (
    <>
      {carts.length > 0 ? (
        <div className="mb-5">
          <div className={cx('cart-container', 'container')}>
            <h4 className={cx('cart-title')}>Giỏ Hàng</h4>

            <div className={cx('cart-select-all')}>
              <label className='fs-5'>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedItems.length === carts.length && carts.length > 0}
                  className='me-2'
                />
                Chọn tất cả
              </label>
              <button className="btn btn-danger" onClick={handleDeleteMultiple}>Xóa nhiều</button>
            </div>

            <div className={cx('cart-items')}>
              {carts.map((item, index) => (
                <div
                  key={`cart-${index}`}
                  className={cx('cart-item')}
                  onClick={() => handleCheckboxChange(item.id)}
                >
                  <div className={cx('cart-item-check')}>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(item.id)}
                      checked={selectedItems.includes(item.id)}
                    />
                  </div>
                  <div className={cx('cart-item-img')}>
                    <img src={item?.images?.[0]?.url || 'https://via.placeholder.com/100'} alt={item?.Product?.title} />
                  </div>
                  <div className={cx('cart-item-info')}>
                    <h5 className={cx('item-title')} onClick={() => handleRedirectProductDetail(item?.Product?.slug)}>{item?.Product?.title}</h5>
                    <p className={cx('item-color')}>{item?.Config?.Color?.name}</p>
                    <p className={cx('item-price')}>{formatNumber(item?.Config?.price)}đ</p>
                  </div>
                  <div className={cx('cart-item-quantity')}>
                    <button
                      className="btn btn-sm fs-5"
                      onClick={(e) => handleDecreaseQuantityCart(e, item)}
                    >
                      -
                    </button>
                    <span className='fs-5'>{item?.quantity}</span>
                    <button
                      className="btn btn-sm fs-5"
                      onClick={(e) => handleIncreaseQuantityCart(e, item)}
                    >
                      +
                    </button>
                  </div>
                  <div className={cx('cart-item-total')}>
                    <div className={cx('total-price', 'mb-0')}>
                      {formatNumber(item?.Config?.price * item?.quantity)}đ
                    </div>
                    <div className={cx('total-quantity', 'mb-2')}>
                      {item?.quantity} x {formatNumber(item?.Config?.price)}đ
                    </div>
                    <div className={cx('cart-item-actions')}>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleBuyOne(e, item)}
                      >
                        Mua ngay
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDeleteCart(e, item)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={cx('cart-summary')}>
              <div className={cx('summary-info')}>
                <span className='fs-5'>Tổng cộng:</span>
                <span className='fs-5'>{carts.reduce((total, item) => total + item?.quantity, 0)} sản phẩm</span>
              </div>
              <div className={cx('summary-total', 'd-flex justify-content-end')}>
                <span className='fs-4'>{formatNumber(carts.reduce((total, item) => total + item?.Config?.price * item?.quantity, 0))}đ</span>
              </div>
              <div className={cx('summary-actions')}>
                <button className="btn btn-success" onClick={handleBuyMultiple}>Mua nhiều</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={cx('empty-cart')}>
          <p>Giỏ hàng của bạn hiện đang trống.</p>
        </div>
      )}
    </>
  );
}

export default Cart;
