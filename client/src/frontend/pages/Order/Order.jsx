import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import classNames from 'classnames/bind'
import styles from './Order.module.scss'
import { readOrder, readOrderLine } from '../../services/publicApi'

const cx = classNames.bind(styles)

const Order = () => {
  const [data, setData] = useState([])
  const [orderLine, setOrderLine] = useState([])
  const [activeTab, setActiveTab] = useState('Tất cả')
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  const handleFetchOrder = async (status = null) => {
    try {
      const response = await readOrder({ order_status: status }) 
      setData(response?.data?.data || [])
    } catch (error) {
      toast.error('Error fetching orders.')
    }
  }

  const handleFetchOrderLine = async () => {
    try {
      const response = await readOrderLine()
      setOrderLine([{ translated_name: 'Tất cả' }, ...(response?.data?.data || [])])
    } catch (error) {
      toast.error('Error fetching order lines.')
    }
  }

  useEffect(() => {
    handleFetchOrder()
    handleFetchOrderLine()
  }, [])

  useEffect(() => {
    const status = activeTab === 'Tất cả' ? null : Object.keys(getStatus()).find(key => getStatus()[key] === activeTab)
    handleFetchOrder(status)
  }, [activeTab])

  const formatNumber = (number) => number.toLocaleString('vi-VN')

  const handleViewDetails = (orderId) => {
    setSelectedOrderId((prevId) => (prevId === orderId ? null : orderId))
  }

  const getStatus = () => ({
    'pending': 'Chờ thanh toán',
    'shipping': 'Vận chuyển',
    'delivered': 'Chờ giao hàng',
    'completed': 'Hoàn thành',
    'cancelled': 'Đã hủy',
    'returned': 'Trả hàng/Hoàn tiền'
  })

  const formatDate = (date) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={cx('cs-bg-color')}>
      <div className="container">
        <div className={cx('cs-wrapper')}>
          <div className={cx('cs-bl-title')}>
            {orderLine.map((line, index) => (
              <div
                key={index}
                className={cx('cs-title-item', { 'cs-title-item-active': activeTab === line.translated_name })}
                style={{ color: activeTab === line.translated_name ? 'var(--primary)' : 'inherit' }}
                onClick={() => setActiveTab(line.translated_name)}
              >
                {line.translated_name}
              </div>
            ))}
          </div>

          {data?.orders?.length > 0 ? (
            <div className={cx('cs-bl-item')}>
              {data?.orders?.map((order, index) => (
                <React.Fragment key={`order-${index}`}>
                  <div className={cx('order-card')}>
                    <div className={cx('order-header')}>
                      <div className={cx('order-id-date')}>
                        <div className={cx('order-id')}></div>
                        <div className={cx('order-time')}>
                          <strong className={cx('highlight')}>Giờ tạo:</strong> {new Date(order?.dataValues?.createdAt).toLocaleTimeString('vi-VN')}
                        </div>
                        <div className={cx('order-date')}>
                          <strong className={cx('highlight')}>Ngày tạo:</strong> {formatDate(order?.dataValues?.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className={cx('order-body')}>
                      <div className={cx('order-info')}>
                        <div className={cx('info-item')}>
                          <span className={cx('label')}><strong className={cx('highlight')}>Số lượng:</strong> </span>
                          <span className={cx('value')}>{order?.dataValues?.cart_ids?.length} sản phẩm</span>
                        </div>
                        <div className={cx('info-item')}>
                          <span className={cx('label')}><strong className={cx('highlight')}>Thành tiền:</strong> </span>
                          <span className={cx('value', 'total')}>{formatNumber(order?.dataValues?.total)}₫</span>
                        </div>
                        <div className={cx('info-item')}>
                          <span className={cx('label')}><strong className={cx('highlight')}>Ghi chú:</strong> </span>
                          <span className={cx('value')}>{order?.dataValues?.note}</span>
                        </div>
                      </div>
                    </div>
                    <div className={cx('order-status-wrapper')}>
                      <span className={cx('order-status')}><strong className={cx('highlight')}>Trạng thái:</strong> {getStatus()[order?.dataValues?.order_status]}</span>
                    </div>
                    <div className={cx('order-footer')}>
                      <button
                        className={cx('btn', 'btn-primary me-2')}
                        onClick={() => handleViewDetails(order?.dataValues?.id)}
                      >
                        {selectedOrderId === order?.dataValues?.id ? 'Hide Details' : 'View Details'}
                      </button>
                      <button className={cx('btn', 'btn-secondary')}>Cancel Order</button>
                    </div>
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
          ) : (
            <div className={cx('no-order')}>
              <p>Không có order</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Order
