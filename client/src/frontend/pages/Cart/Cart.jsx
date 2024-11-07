import classNames from 'classnames/bind'
import styles from './Cart.module.scss'


const cx = classNames.bind(styles)
const Cart = () => {
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  const isTrue = true
  return (
    <>
      {isTrue ? <div className='container'>
        <div className={cx('cs-wrapper')}>
          <h4 className={cx('pt-4', 'fw-normal')}>Giỏ Hàng</h4>
          <table className="table table-striped">
            <thead>
              <tr className=''>
                <th className={cx('fw-normal')} scope="col">
                  <label htmlFor='checkboxNoLabelTitle' className={cx('w-100', 'cs-cursor')}>
                    <input className="form-check-input" type="checkbox" id="checkboxNoLabelTitle" defaultValue aria-label="..." />
                  </label>
                </th>
                <th className={cx('fw-normal')} scope="col">STT</th>
                <th className={cx('fw-normal')} scope="col"></th>
                <th className={cx('fw-normal')} scope="col">TÊN SẢN PHẨM</th>
                <th className={cx('fw-normal')} scope="col">MÀU</th>
                <th className={cx('fw-normal')} scope="col">GIÁ GỐC</th>
                <th className={cx('fw-normal')} scope="col">SỐ LƯỢNG</th>
                <th className={cx('fw-normal')} scope="col">TỔNG TIỀN</th>
                <th className={cx('fw-normal')} scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {arr.map((item, index) => {
                return (
                  <tr key={`cart-${index}`}>
                    <th className={cx('fw-light')}>
                      <label htmlFor={`checkboxNoLabelDesc-${index}`} className={cx('w-100', 'cs-cursor')}>
                        <input className="form-check-input" type="checkbox" id={`checkboxNoLabelDesc-${index}`} defaultValue aria-label="..." />
                      </label>
                    </th>
                    <th className={cx('fw-light')}>{index + 1}</th>
                    <td className={cx('fw-light')}>image</td>
                    <td className={cx('fw-light')}>iPhone 11 4GB 128GB Black</td>
                    <td className={cx('fw-light')}>Black</td>
                    <td className={cx('fw-light')}>13990000đ</td>
                    <td className={cx('fw-light')}>
                      <div className="btn-group" role="group" aria-label="Default button group">
                        <button type="button" className="btn btn-outline-secondary">-</button>
                        <button disabled type="button" className="btn btn-outline-secondary text-dark">2</button>
                        <button type="button" className="btn btn-outline-secondary">+</button>
                      </div>
                    </td>
                    <td className={cx('fw-light')}>26000000đ</td>
                    <td className={cx('fw-light')}>
                      <button type="button" className="btn btn-secondary me-2">Xóa</button>
                      <button type="button" className="btn btn-secondary">Mua ngay</button>
                    </td>
                  </tr>
                )
              })}
              {/* total */}
              <tr >
                <th className={cx('fw-light')}></th>
                <th className={cx('fw-light')}></th>
                <td className={cx('fw-light')}></td>
                <td className={cx('fw-light')}></td>
                <td className={cx('fw-light')}></td>
                <td className={cx('fw-light')}></td>
                <td className={cx('fw-normal px-5')}>10</td>
                <td className={cx('fw-normal')}>26000000đ</td>
                <td className={cx('fw-light')}>
                  <button type="button" className="btn btn-primary text-light">Mua nhiều</button>
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
