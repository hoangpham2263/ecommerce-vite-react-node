import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import classNames from 'classnames/bind'
import styles from './Order.module.scss'
import { readOrder } from '../../services/publicApi'

const cx = classNames.bind(styles)

const Order = () => {
  const [data, setData] = useState([])
  const [activeTab, setActiveTab] = useState('Tất cả')
  const [selectedOrderId, setSelectedOrderId] = useState(null) // Store the selected order's id

  const handleFetchOrder = async () => {
    try {
      const response = await readOrder()
      setData(response?.data?.data || [])
    } catch (error) {
      toast.error('Error fetching orders.')
    }
  }

  useEffect(() => {
    handleFetchOrder()
  }, [])

  const formatNumber = (number) => number.toLocaleString('vi-VN')

  const handleViewDetails = (orderId) => {
    // Toggle the selected order to show/hide details
    setSelectedOrderId((prevId) => (prevId === orderId ? null : orderId))
  }

  const getStatus = (status) => {
    const statusLabels = {
      'pending': 'Chờ thanh toán',
      'shipping': 'Vận chuyển',
      'delivered': 'Chờ giao hàng',
      'completed': 'Hoàn thành',
      'cancelled': 'Đã hủy',
      'returned': 'Trả hàng/Hoàn tiền',
    }
    return statusLabels[status] || 'Unknown'
  }

  const formatDate = (date) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className={cx('cs-bg-color')}>
      {data?.orders?.length > 0 ? (
        <div className="container">
          <div className={cx('cs-wrapper')}>
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

            <div className={cx('cs-bl-item')}>
              {data?.orders?.map((order, index) => (
                <React.Fragment key={`order-${index}`}>
                  <div className={cx('order-card')}>
                    <div className={cx('order-header')}>
                      <div className={cx('order-id-date')}>
                        <div className={cx('order-id')}>
                          <strong>ID:</strong> {order?.dataValues?.id}
                        </div>
                        <div className={cx('order-time')}>
                          <strong>Giờ:</strong> {new Date(order?.dataValues?.createdAt).toLocaleTimeString('vi-VN')}
                        </div>
                        <div className={cx('order-date')}>
                          <strong>Ngày tạo:</strong> {formatDate(order?.dataValues?.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className={cx('order-body')}>
                      <div className={cx('order-info')}>
                        <div className={cx('info-item')}>
                          <span className={cx('label')}><strong>Số lượng:</strong> </span>
                          <span className={cx('value')}>{order?.dataValues?.cart_ids?.length} sản phẩm</span>
                        </div>
                        <div className={cx('info-item')}>
                          <span className={cx('label')}><strong>Thành tiền:</strong> </span>
                          <span className={cx('value', 'total')}>{formatNumber(order?.dataValues?.total)}₫</span>
                        </div>
                        <div className={cx('info-item')}>
                          <span className={cx('label')}><strong>Ghi chú:</strong> </span>
                          <span className={cx('value')}>{order?.dataValues?.note}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status - now placed here after the order body */}
                    <div className={cx('order-status-wrapper')}>
                      <span className={cx('order-status')}><strong>Trạng thái:</strong> {getStatus(order?.dataValues?.status)}</span>
                    </div>

                    <div className={cx('order-footer')}>
                      <button
                        className={cx('btn', 'btn-primary me-2')}
                        onClick={() => handleViewDetails(order?.dataValues?.id)} // Toggle order details
                      >
                        {selectedOrderId === order?.dataValues?.id ? 'Hide Details' : 'View Details'}
                      </button>
                      <button className={cx('btn', 'btn-secondary')}>Cancel Order</button>
                    </div>

                    {/* Render order details only if this order is selected */}
                  </div>
                  {selectedOrderId === order?.dataValues?.id && (
                    <div className={cx('order-details')}>
                      <table className={cx('details-table')}>
                        <thead>
                          <tr>
                            <th></th>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order?.carts?.map((cart, index) => (
                            <tr key={index}>
                              <td><img src={cart?.images?.[0]?.url} alt={cart?.Product?.title} width="50" /></td>
                              <td>{cart?.Product?.title} - {cart?.Product?.Capacity?.name} - {cart?.Product?.Ram?.name}</td>
                              <td>{cart?.quantity}</td>
                              <td>{formatNumber(cart?.Config?.price)}₫</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={cx('no-order')}>
          <img src='https://res.cloudinary.com/dqhj1sukr/image/upload/v1730960241/uploadLocal_ecommerce/cart.png' alt='Empty Cart' />
          <p>No orders found</p>
        </div>
      )}
    </div>
  )
}

export default Order
