import classNames from 'classnames/bind'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import styles from './Cart.module.scss'
import { addCart, deleteCart, readCart } from '../../services/publicApi'
import { LocalStorageGetInfo } from '../../../main/components/LocalStorageMethod'
import { useNavigate } from 'react-router-dom'
import config from '../../config'
import useFetchAmountCart from '../../hooks/useFetchAmountCart'

const cx = classNames.bind(styles)
const Cart = () => {
  // ---------- init variable ----------
  const navigate = useNavigate()
  const LocalStorageGetInfos = LocalStorageGetInfo() || {}
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
  const handleDecreaseQuantityCart = async (item) => {
    const data = {
      UserId: item?.UserId,
      ProductId: item?.Product?.id,
      quantity: item?.quantity > 1 ? item?.quantity - 1 : item.quantity,
      config_id: item?.config_id
    }
    const fetchCart = await addCart(data)
    if (fetchCart?.data?.code === 0) {
      handleFetchCarts()
    }
  }
  const handleIncreaseQuantityCart = async (item) => {
    const data = {
      UserId: item?.UserId,
      ProductId: item?.Product?.id,
      quantity: item?.quantity + 1,
      config_id: item?.config_id
    }
    const fetchCart = await addCart(data)
    if (fetchCart?.data?.code === 0) {
      handleFetchCarts()
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

  return (
    <>
      {carts.length > 0 ? <div className='container'>
        <div className={cx('cs-wrapper')}>
          <h4 className={cx('pt-4', 'pb-2', 'fw-normal')}>Giỏ Hàng</h4>
          <table className="table table-striped">
            <thead>
              <tr className=''>
                <th className={cx('fw-normal')} scope="col">
                  <label htmlFor='checkboxNoLabelTitle' className={cx('w-100', 'cs-cursor')}>
                    <input className={cx('form-check-input', 'cs-cursor')} type="checkbox" id="checkboxNoLabelTitle" aria-label="..." onChange={handleSelectAll} checked={selectedItems.length === carts.length && carts.length > 0} />
                  </label>
                </th>
                <th className={cx('fw-normal', 'cs-cursor-text')} scope="col">STT</th>
                <th className={cx('fw-normal', 'cs-cursor-text')} scope="col"></th>
                <th className={cx('fw-normal', 'cs-cursor-text')} scope="col">TÊN SẢN PHẨM</th>
                <th className={cx('fw-normal', 'cs-cursor-text')} scope="col">MÀU</th>
                <th className={cx('fw-normal', 'cs-cursor-text')} scope="col">GIÁ GỐC</th>
                <th className={cx('fw-normal', 'cs-cursor-text')} scope="col">SỐ LƯỢNG</th>
                <th className={cx('fw-normal', 'cs-cursor-text')} scope="col">TỔNG TIỀN</th>
                <th className={cx('fw-normal', 'cs-cursor-text')} scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {carts && carts.map((item, index) => {
                return (
                  <tr key={`cart-${index}`}>
                    <th className={cx('fw-light')}>
                      <label htmlFor={`checkboxNoLabelDesc-${index}`} className={cx('w-100', 'cs-cursor')}>
                        <input className={cx('form-check-input', 'cs-cursor')} type="checkbox" id={`checkboxNoLabelDesc-${index}`} aria-label="..." onChange={() => handleCheckboxChange(item.id)} checked={selectedItems.includes(item.id)} />
                      </label>
                    </th>
                    <th className={cx('fw-light', 'cs-cursor-text')}>{index + 1}</th>
                    <td className={cx('fw-light', 'cs-cursor-text')}>
                      <img className={cx('cs-img')} src={item?.images && item?.images[0]?.url} />
                    </td>
                    <td className={cx('fw-light', 'cs-cursor-text')}>{item?.Product?.title}</td>
                    <td className={cx('fw-light', 'cs-cursor-text')}>{item?.Config?.Color?.name}</td>
                    <td className={cx('fw-light', 'cs-cursor-text')}>{formatNumber(item?.Config?.price)}đ</td>
                    <td className={cx('fw-light', 'cs-cursor-text')}>
                      <div className="btn-group" role="group" aria-label="Default button group">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => handleDecreaseQuantityCart(item)}>-</button>
                        <button disabled type="button" className="btn btn-outline-secondary text-dark">{item?.quantity}</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => handleIncreaseQuantityCart(item)}>+</button>
                      </div>
                    </td>
                    <td className={cx('fw-light', 'cs-cursor-text')}>{formatNumber(item?.Config?.price * item?.quantity)}đ</td>
                    <td className={cx('fw-light text-end', 'w-btn')}>
                      <button type="button" className="btn btn-primary me-2" onClick={() => handleBuyOne(item)}>Mua ngay</button>
                      <button type="button" className="btn btn-danger" onClick={() => handleDeleteCart(item)}>Xóa</button>
                    </td>
                  </tr>
                )
              })}
              {/* total */}
              <tr className={cx('cs-border')}>
                <th className={cx('fw-light')}></th>
                <th className={cx('fw-light')}></th>
                <td className={cx('fw-light')}></td>
                <td className={cx('fw-light')}></td>
                <td className={cx('fw-light')}></td>
                <td className={cx('fw-light')}></td>
                <td className={cx('fw-medium px-5 text-danger')}>{carts && carts.reduce((total, num) => total + (num?.quantity || 0), 0)}</td>
                <td className={cx('fw-medium text-danger')}>{carts && formatNumber(carts.reduce((total, item) => total + (item?.Config?.price * item?.quantity || 0), 0))}đ</td>
                <td className={cx('fw-light text-end', 'w-btn')}>
                  <button type="button" className="btn btn-primary text-light me-2" onClick={handleBuyMultiple}>Mua nhiều</button>
                  <button type="button" className="btn btn-danger text-light" onClick={handleDeleteMultiple}>Xóa nhiều</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> : <div className={cx('no-cart')}><img src='https://res.cloudinary.com/dqhj1sukr/image/upload/v1730960241/uploadLocal_ecommerce/cart.png' /></div>
      }
    </>
  )
}

export default Cart
