import classNames from 'classnames/bind'
import styles from './Checkout.module.scss'
import { IoLocationSharp } from 'react-icons/io5'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { LocalStorageGetInfo } from '../../../main/components/LocalStorageMethod'

const cx = classNames.bind(styles)
const Checkout = () => {
  const dataCheckout = JSON.parse(localStorage.getItem('dataCheckout'))
  const LocalStorageGetInfos = LocalStorageGetInfo() || {}

  // ---------- formatNumber ----------
  const formatNumber = (number) => { return number != null ? number.toLocaleString('vi-VN') : '' }



  // ---------- PayPal ----------
  const [dataPayment, setDataPayment] = useState({ ship: 20000, payment: 'payment-on-delivery' })

  const handleCheckout = async (e) => {
    e.preventDefault()
    // let currentDataPayment = { ...dataCheckout[0], priceDiscount: dataCheckout[0]?.priceDiscount + dataPayment.ship }
    // const value = (+totalPrice() + +dataPayment.ship)
    // const fetchSendMailer = await sendMailer({ userLogin, dataCheckout, value })
    // console.log(fetchSendMailer);
    // if (fetchSendMailer) {
    //   let fetchOrder = await createOrderWithUser(userLogin?.id)
    //   if (fetchOrder) {
    //     await dataCheckout.map(async (cart, index) => {
    //       if (!cart.id) {
    //         let currentCart = { ...cart, idOrder: fetchOrder?.DT?.id }
    //         await createCart(currentCart)
    //         await fetchJWT()
    //       } else {
    //         await updateCart(cart.id, fetchOrder?.DT?.id)
    //         await fetchJWT()
    //       }
    //     })
    //   }
    //   toast.success("Đặt hàng thành công");
    //   navigate(`/${config.routes.order}`)
    // }
  }

  const createOrder = (data, actions) => {
    // return actions.order.create({
    //   purchase_units: [{
    //     amount: {
    //       value: (+totalPrice() + +dataPayment.ship) / 10000
    //     }
    //   }]
    // })
  }

  const onApprove = (data, actions) => {
    // return actions.order.capture().then(async (details) => {
    //   if (details.status === 'COMPLETED') {
    //     let fetchOrder = await createOrderWithUser(userLogin?.id)
    //     if (fetchOrder) {
    //       await dataCheckout.map(async (cart, index) => {
    //         if (!cart.id) {
    //           let currentCart = { ...cart, idOrder: fetchOrder?.DT?.id }
    //           await createCart(currentCart)
    //           await fetchJWT()
    //         } else {
    //           await updateCart(cart.id, fetchOrder?.DT?.id)
    //           await fetchJWT()
    //         }
    //       })
    //     }
    //     toast.success('Đặt hàng thành công')
    //     navigate(`/${config.routes.order}`)
    //   } else {
    //     toast.warning('Số dư không đủ')
    //   }
    // }).catch((error) => {
    //   console.error('Transaction failed: ', error)
    //   toast.warning('Đã xảy ra lỗi trong quá trình giao dịch.')
    // })
  }
  const onError = (err) => {
    console.error('PayPal Checkout onError', err)
    toast.error('Đã xảy ra lỗi trong quá trình giao dịch.')
  }
  console.log(LocalStorageGetInfos)
  return (
    <>
      <div className={cx('bl-logo-checkout')} >
        <div className={cx('container', 'logo-checkout')}>
          <div className={cx('logo')}>
            <img
              src="https://res.cloudinary.com/daofedrqe/image/upload/v1707379342/wanfit_apple_imageAvt/mhf6siicj77fofhuvfcm.png"
              alt=""
            />
            {LocalStorageGetInfos.user.full_name}
          </div>
          <div className={cx('checkout')}>Thanh Toán</div>
        </div>
      </div>
      <div className={cx('bg-wrapper')}>
        <div className={cx('container')}>
          <div className={cx('bg-top')}></div>
          <div className={cx('location')}>
            <div className={cx('title')}>
              <IoLocationSharp className={cx('logo')} />
              Địa chỉ nhận hàng
            </div>
            <div className={cx('content')}>
              <div className={cx('content-1')}>
                {'Phạm Quốc Hoàng'}{' / '}{'0123456789'}
              </div>
              <div className={cx('content-2')}>
                {'123 Nguyễn Văn Linh'}{' - '}{'Hòa Cường Bắc'}{' - '}{'Hải Châu'}{' - '}{'Đà Nẵng'} {'(mặc định)'}
              </div>
              <a className={cx('content-3')}>Thay Đổi</a>
            </div>
          </div>
          {/* product */}
          <h4 className="rounded p-4 bg-white w-100 mb-1">Sản phẩm</h4>
          <table className="table table-hover mb-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Màu</th>
                <th scope="col">Dung lượng</th>
              </tr>
            </thead>
            <tbody>
              {dataCheckout && dataCheckout.map((product, index) => {
                return (<tr key={`${index}-product`}>
                  <th scope="row">{index + 1}</th>
                  <td><img className={cx('img-avatar')} src={`${product?.image}`} alt="" /></td>
                  <td >{product?.title}</td>
                  <td>{product && formatNumber(10000)}₫</td>
                  <td>{product?.color}</td>
                  <td>{product?.capacity}</td>
                </tr>)
              })}
            </tbody>
          </table>
          <h4 className="rounded p-4 bg-white w-100 mb-1">Thanh toán</h4>
          <div className={cx('payment')}>
            <div className="row">
              <div className="col-8">
                <div className="rounded p-4 bg-white w-100 mb-1">
                  <h5 className="fw-bold mb-3">Chọn phương thức giao hàng</h5>
                  <div className="border border-primary-subtle rounded w-50 bg-primary bg-opacity-10 p-4">
                    <div className="form-check mb-2">
                      {/* <input defaultChecked className="form-check-input" value={20000} type="radio" name="ship" id="ship1" onChange={handlePayment} /> */}
                      <label className="form-check-label" htmlFor="ship1">
                        Giao hàng tiết kiệm
                      </label>
                    </div>
                    <div className="form-check">
                      {/* <input className="form-check-input" value={30000} type="radio" name="ship" id="ship2" onChange={handlePayment} /> */}
                      <label className="form-check-label" htmlFor="ship2">
                        Giao hàng nhanh
                      </label>
                    </div>
                  </div>
                </div>
                <div className="rounded p-4 bg-white w-100">
                  <h5 className="fw-bold mb-3">Chọn phương thức thanh toán</h5>
                  <div className="border border-primary-subtle rounded w-50 bg-primary bg-opacity-10 p-4">
                    <div className="form-check">
                      {/* <input defaultChecked className="form-check-input" value={'payment-on-delivery'} type="radio" name="payment" id="payment1" onChange={handlePayment} /> */}
                      <label className="form-check-label mb-2" htmlFor="payment1">
                        Thanh toán tiền mặt khi nhận hàng
                      </label>
                    </div>
                    <div className="form-check">
                      {/* <input className="form-check-input" value={'payment-paypal'} type="radio" name="payment" id="payment2" onChange={handlePayment} /> */}
                      <label className="form-check-label" htmlFor="payment2">
                        Thanh toán tiền bằng paypal
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="rounded p-4 bg-white w-100 mb-1">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td>Tạm tính</td>
                        <td className="d-flex justify-content-end fw-bold">{dataCheckout && formatNumber(10000000)} VND</td>
                      </tr>
                      <tr>
                        <td>Giảm giá</td>
                        <td className="d-flex justify-content-end fw-bold">0 VND</td>
                      </tr>
                      <tr>
                        <td>Phí giao hàng</td>
                        <td className="d-flex justify-content-end fw-bold">{formatNumber(+20000)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded p-4 bg-white w-100">
                  <table className="table table-borderless fs-4">
                    <tbody>
                      <tr>
                        <td>Tổng tiền</td>
                        {/* <td className="d-flex justify-content-end fw-bold fs-2 text-danger">{dataCheckout && formatNumber((+totalPrice() + +dataPayment.ship))} VND</td> */}
                      </tr>
                      <tr>
                        <td colSpan={2} className="text-center">(Đã bao gồm VAT nếu có)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="py-4 w-100">
                  {dataPayment.payment === 'payment-on-delivery'
                    && <div className={cx('bl-btn')}>
                      <button type="submit" className={cx('btn')} onClick={(e) => handleCheckout(e)}>
                        Đặt hàng
                      </button>
                    </div>
                  }
                  {dataPayment.payment === 'payment-paypal'
                    && <PayPalScriptProvider options={{ 'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID }} amount={10000000}>
                      <PayPalButtons style={{ layout: 'vertical' }} onApprove={onApprove} createOrder={createOrder} onError={onError} />
                    </PayPalScriptProvider>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
