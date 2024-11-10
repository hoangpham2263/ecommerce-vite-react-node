import classNames from 'classnames/bind'
import styles from './Checkout.module.scss'
import { IoLocationSharp } from 'react-icons/io5'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { LocalStorageGetInfo } from '../../../main/components/LocalStorageMethod'
import { readImage, readCartByIds, readProductByIds } from '../../services/publicApi'
import { BsCashCoin } from 'react-icons/bs'
import { FaCcPaypal } from 'react-icons/fa6'
import { BsPaypal } from 'react-icons/bs'

const cx = classNames.bind(styles)
const Checkout = () => {
  const dataCheckout = JSON.parse(localStorage.getItem('dataCheckout'))
  const LocalStorageGetInfos = LocalStorageGetInfo() || {}
  const [carts, setCarts] = useState([])

  // ---------- formatNumber ----------
  const formatNumber = (number) => { return number != null ? number.toLocaleString('vi-VN') : '' }

  // ---------- totalPrice ----------
  const totalPrice = carts.reduce((acc, product) => {
    return acc + (product.total)
  }, 0)

  // ---------- fetch product ----------
  const fetchProduct = async () => {
    const fetchDataImage = await readImage(1, 10000)
    const fetchDataCart = await readCartByIds(dataCheckout)
    const imageData = fetchDataImage?.data?.data?.image
    const cartsData = fetchDataCart?.data?.data

    const imagesByProductId = imageData.reduce((acc, image) => {
      if (!acc[image.product_id]) {
        acc[image.product_id] = []
      }
      acc[image.product_id].push(image)
      return acc
    }, {})
    const groupedProducts = cartsData.map((cart) => {
      return {
        ...cart,
        images: imagesByProductId[cart?.Product?.id] || []
      }
    })
    setCarts(groupedProducts)
  }
  useEffect(() => { fetchProduct() }, [])

  // ---------- PayPal ----------
  const [dataPayment, setDataPayment] = useState({ ship: 20000, payment: 'payment-on-delivery' })
  const handlePayment = (e) => {
    const { name, value } = e.target
    setDataPayment((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

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
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: (+totalPrice + +dataPayment.ship) / 100000
        }
      }]
    })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      console.log(details)
      if (details.status === 'COMPLETED') {
        // let fetchOrder = await createOrderWithUser(userLogin?.id)
        // if (fetchOrder) {
        //   await dataCheckout.map(async (cart, index) => {
        //     if (!cart.id) {
        //       let currentCart = { ...cart, idOrder: fetchOrder?.DT?.id }
        //       await createCart(currentCart)
        //       await fetchJWT()
        //     } else {
        //       await updateCart(cart.id, fetchOrder?.DT?.id)
        //       await fetchJWT()
        //     }
        //   })
        // }
        toast.success('Đặt hàng thành công')
        // navigate(`/${config.routes.order}`)
      } else {
        toast.warning('Số dư không đủ')
      }
    }).catch((error) => {
      toast.warning('Đã xảy ra lỗi trong quá trình giao dịch.')
    })
  }
  const onError = (err) => {
    toast.error('Đã xảy ra lỗi trong quá trình giao dịch.')
  }

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
              <tr className={cx('cursor-text')}>
                <th className={cx('cursor-text')} scope="col">#</th>
                <th className={cx('cursor-text')} scope="col">Hình ảnh</th>
                <th className={cx('cursor-text')} scope="col">Tên sản phẩm</th>
                <th className={cx('cursor-text')} scope="col">Giá</th>
                <th className={cx('cursor-text')} scope="col">Màu</th>
                <th className={cx('cursor-text')} scope="col">Dung lượng</th>
                <th className={cx('cursor-text')} scope="col">Số lượng</th>
                <th className={cx('cursor-text')} scope="col">Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {carts && carts.map((cart, index) => {
                return (
                  <tr key={`${index}-product`} className={cx('cursor-text')}>
                    <th className={cx('cursor-text')} scope="row">{index + 1}</th>
                    <td><img className={cx('img-avatar', 'cursor-text')} src={cart?.images[0]?.url || ''} alt="" /></td>
                    <td className={cx('cursor-text')} >{cart?.Product?.title}</td>
                    <td className={cx('cursor-text')}>{cart && formatNumber(cart?.Product?.price)}₫</td>
                    <td className={cx('cursor-text')}>{cart?.Product?.Color?.name}</td>
                    <td className={cx('cursor-text')}>{cart?.Product?.Capacity?.name}</td>
                    <td className={cx('cursor-text')}>{cart?.quantity}</td>
                    <td className={cx('cursor-text')}>{cart && formatNumber(cart?.total)}₫</td>
                  </tr>
                )
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
                      <input defaultChecked className={cx('form-check-input', 'cursor-pointer', 'cs-input-option')} value={20000} type="radio" name="ship" id="ship1" onChange={handlePayment} />
                      <label className={cx('form-check-label', 'cursor-pointer')} htmlFor="ship1">
                        Giao hàng tiết kiệm
                      </label>
                    </div>
                    <div className="form-check">
                      <input className={cx('form-check-input', 'cursor-pointer', 'cs-input-option')} value={30000} type="radio" name="ship" id="ship2" onChange={handlePayment} />
                      <label className={cx('form-check-label', 'cursor-pointer')} htmlFor="ship2">
                        Giao hàng nhanh
                      </label>
                    </div>
                  </div>
                </div>
                <div className="rounded p-4 bg-white w-100">
                  <h5 className="fw-bold mb-3">Chọn phương thức thanh toán</h5>
                  <div className="border border-primary-subtle rounded w-50 bg-primary bg-opacity-10 p-4">
                    <div className="form-check mb-2">
                      <input defaultChecked className={cx('form-check-input', 'cursor-pointer', 'cs-input-option')} value={'payment-on-delivery'} type="radio" name="payment" id="payment1" onChange={handlePayment} />
                      <label className={cx('form-check-label', 'cursor-pointer', 'd-flex', 'align-items-center')} htmlFor="payment1">
                        <BsCashCoin className={cx('me-2', 'fs-4', 'text-secondary')} />
                        Thanh toán tiền mặt khi nhận hàng
                      </label>
                    </div>
                    <div className="form-check">
                      <input className={cx('form-check-input', 'cursor-pointer', 'cs-input-option')} value={'payment-paypal'} type="radio" name="payment" id="payment2" onChange={handlePayment} />
                      <label className={cx('form-check-label', 'cursor-pointer', 'd-flex', 'align-items-center')} htmlFor="payment2">
                        <BsPaypal className={cx('me-2', 'fs-4', 'text-primary')} />
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
                        <td className="d-flex justify-content-end fw-bold">{carts && formatNumber(+totalPrice)} VND</td>
                      </tr>
                      <tr>
                        <td>Giảm giá</td>
                        <td className="d-flex justify-content-end fw-bold">0 VND</td>
                      </tr>
                      <tr>
                        <td>Phí giao hàng</td>
                        <td className="d-flex justify-content-end fw-bold">{formatNumber(+dataPayment.ship)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded p-4 bg-white w-100">
                  <table className="table table-borderless fs-4">
                    <tbody>
                      <tr>
                        <td>Tổng tiền</td>
                        <td className="d-flex justify-content-end fw-bold fs-3 text-danger">{carts && formatNumber((+totalPrice + +dataPayment.ship))} VND</td>
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
