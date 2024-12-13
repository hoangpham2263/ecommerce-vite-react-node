import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import classNames from 'classnames/bind'
import styles from './Order.module.scss'
import { readOrder } from '../../services/publicApi'

const cx = classNames.bind(styles)

const Order = () => {
  // State to track orders and active tab
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('Tất cả') // 'Tất cả', 'Chờ thanh toán', 'Vận chuyển', etc.

  // Fetch orders from API
  const handleFetchOrder = async () => {
    try {
      const response = await readOrder()
      setOrders(response?.data?.data || []) // Ensure orders is an array
    } catch (error) {
      toast.error('Error fetching orders.')
    }
  }

  useEffect(() => {
    handleFetchOrder()
  }, [])

  const formatNumber = (number) => number.toLocaleString('vi-VN')

  // Filter orders by tab
  const filteredOrders = activeTab === 'Tất cả' ? orders : orders.filter(order => order.status === activeTab)
  console.log(orders)
  return (
    <div className={cx('cs-bg-color')}>
      {orders.length > 0 ? (
        <div className='container'>
          <div className={cx('cs-wrapper')}>
            {/* Tabs for order status */}
            <div className={cx('cs-bl-title')}>
              {['Tất cả', 'Chờ thanh toán', 'Vận chuyển', 'Chờ giao hàng', 'Hoàn thành', 'Đã hủy', 'Trả hàng/Hoàn tiền'].map((title, index) => (
                <div
                  key={index}
                  className={cx('cs-title-item', { 'cs-title-item-active': activeTab === title })}
                  onClick={() => setActiveTab(title)}
                >
                  {title}
                </div>
              ))}
            </div>

            {/* Order list */}
            <div className={cx('cs-bl-item')}>
              {filteredOrders.map((order) => (
                <div key={order.id} className={cx('order-card')}>
                  <div className={cx('order-header')}>
                    <span className={cx('order-id')}>ID: {order.id} - </span>
                    <span className={cx('order-date')}>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className={cx('order-body')}>
                    <div className={cx('order-info')}>
                      <div>
                        <span className={cx('label')}>Số lượng:{' '}</span>
                        <span className={cx('value')}>{order.cart_ids.length} sản phẩm</span>
                      </div>
                      <div>
                        <span className={cx('label')}>Thành tiền:{' '}</span>
                        <span className={cx('value', 'total')}>{formatNumber(order.total)}₫</span>
                      </div>
                      <div>
                        <span className={cx('label')}>Ghi chú:{' '}</span>
                        <span className={cx('value')}>{order.note}</span>
                      </div>
                    </div>
                  </div>
                  <div className={cx('order-footer')}>
                    <button className={cx('btn', 'btn-primary me-2')}>View Details</button>
                    <button className={cx('btn', 'btn-secondary')}>Cancel Order</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={cx('no-cart')}>
          <img src='https://res.cloudinary.com/dqhj1sukr/image/upload/v1730960241/uploadLocal_ecommerce/cart.png' alt='Empty Cart' />
          <p>No orders found</p>
        </div>
      )}
    </div>
  )
}

export default Order
