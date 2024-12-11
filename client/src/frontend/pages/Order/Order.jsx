import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import classNames from 'classnames/bind'
import styles from './Order.module.scss'
import config from '../../config'
import { readOrder } from '../../services/publicApi'

const cx = classNames.bind(styles)
const Order = () => {
  // ---------- init variable ----------
  const [orders, setOrders] = useState([])

  // ---------- call api ----------
  const handleFetchOrder = async () => {
    const fetchOrdersByUser = await readOrder()
    setOrders(fetchOrdersByUser?.data?.data)
  }
  useEffect(() => { handleFetchOrder() }, [])

  const formatNumber = (number) => { return number.toLocaleString('vi-VN') }

  // ---------- render ----------
  return (
    <div className={cx('cs-bg-color')}>
      {orders.length > 0 ? <div className='container'>
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

