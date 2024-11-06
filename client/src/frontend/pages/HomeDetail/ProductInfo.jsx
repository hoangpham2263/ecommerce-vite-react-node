import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'
import { CiMobile4 } from 'react-icons/ci'
import { SlSocialDropbox } from 'react-icons/sl'
import { AiOutlineSecurityScan } from 'react-icons/ai'
import { MdAttachMoney } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { useState } from 'react'

const cx = classNames.bind(styles)

const ProductInfo = () => {
  const [selectedOption, setSelectedOption] = useState('')

  return (
    <div className={cx('row', 'mt-3', 'px-2', 'mb-3')}>
      <div className={cx('col-md-6', 'cs-prod-info', 'px-2', 'pb-0', 'pt-3')}>
        <h5 className={cx('fw-medium', 'fs-5')}>Thông tin sản phẩm</h5>
        <div className={cx('d-flex', 'align-items-center', 'mb-3', 'fw-lighter')}>
          <CiMobile4 className={cx('me-2', 'm-0', 'fs-4')} />
          <p className={cx('m-0', 'd-flex', 'align-items-center')}>Mới, đầy đủ phụ kiện từ nhà sản xuất</p>
        </div>
        <div className={cx('d-flex', 'align-items-center', 'fw-lighter')}>
          <SlSocialDropbox className={cx('me-2', 'm-0', 'fs-5')} />
          <p className={cx('m-0', 'd-flex', 'align-items-center')}>Mới, đầy đủ phụ kiện từ nhà sản xuất</p>
        </div>
        <p className={cx('my-0', 'ms-4', 'ps-1', 'd-flex', 'align-items-center', 'fw-lighter')}>2. Cáp truyền dữ liệu</p>
        <p className={cx('my-0', 'ms-4', 'ps-1', 'd-flex', 'align-items-center', 'fw-lighter')}>3. Que lấy sim</p>
        <p className={cx('my-0', 'ms-4', 'ps-1', 'd-flex', 'align-items-center', 'fw-lighter', 'mb-3')}>* Galaxy S24 Ultra không bao gồm củ sạc.</p>
        <div className={cx('d-flex', 'align-items-start', 'mb-3', 'fw-lighter')}>
          <AiOutlineSecurityScan className={cx('me-2', 'm-0', 'fs-1')} />
          <p className={cx('m-0')}>Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất. <span className={cx('text-danger')}>(xem chi tiết)</span></p>
        </div>
        <div className={cx('d-flex', 'align-items-center', 'fw-lighter')}>
          <MdAttachMoney className={cx('me-2', 'm-0', 'fs-5')} />
          <p className={cx('m-0', 'd-flex', 'align-items-center')}>Giá sản phẩm đã bao gồm VAT</p>
        </div>
      </div>
      <div className={cx('col-md-6', 'pt-0', 'pe-0', 'pb-0')}>
        <div className={cx('row', 'mb-2')}>
          <div className={cx('col-6')}>
            <div className={cx('cs-prod-info', 'text-center', 'py-2')}>
              Hồ Chí Minh
            </div>
          </div>
          <div className={cx('col-6')}>
            <div >
            </div>
            <select
              className={cx('cs-prod-info', 'px-3', 'py-2', 'form-select')}
              aria-label="Default select example"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="" disabled>Quận / Huyện</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
            </select>
          </div>
        </div>
        <div className={cx('row', 'mb-2')}>
          <p className={cx('my-0', 'ms-2', 'ps-1', 'd-flex', 'align-items-center', 'fw-lighter', 'mb-2')}>Có <strong className={cx('ms-2')}>8</strong> cửa hàng có sản phẩm</p>
          <div className={cx('col-md-12')}>
            <div className={cx('cs-prod-info', 'cs-bl-site', 'p-2', 'pe-0')}>
              <table className="table table-striped m-0">
                <thead>
                  <tr className={cx('d-none')}>
                    <th scope="col" className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0')}><FaPhoneAlt className={cx('cs-icon-phone')} /></th>
                    <th className={cx('cs-line')}>-</th>
                    <th scope="col" className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} /></th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <th scope="col" className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871068880</th>
                    <th className={cx('cs-line')}>-</th>
                    <th scope="col" className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />888 Tỉnh Lộ 10, P. Bình Trị Đông A, Q. Bình Tân</th>
                  </tr>
                  <tr >
                    <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871087386</td>
                    <td className={cx('cs-line')}>-</td>
                    <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />386 Hương Lộ 2, P. Bình Trị Đông, Q. Bình Tân (Ngã Tư Bốn Xã)</td>
                  </tr>
                  <tr >
                    <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871000229</td>
                    <td className={cx('cs-line')}>-</td>
                    <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />127 Nguyễn Thị Tú, P. Bình Hưng Hoà B, Q. Bình Tân</td>
                  </tr>
                  <tr >
                    <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871016161</td>
                    <td className={cx('cs-line')}>-</td>
                    <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />161 Nguyễn Sơn, P. Phú Thạnh, Q. Tân Phú</td>
                  </tr>
                  <tr >
                    <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871000449</td>
                    <td className={cx('cs-line')}>-</td>
                    <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />449 - 451 Tân Kỳ Tân Quý, P. Tân Quý, Q. Tân Phú, TP. HCM</td>
                  </tr>
                  <tr >
                    <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871097020</td>
                    <td className={cx('cs-line')}>-</td>
                    <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />114 Phan Đăng Lưu, P. 3, Q. Phú Nhuận</td>
                  </tr>
                  <tr >
                    <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871067171</td>
                    <td className={cx('cs-line')}>-</td>
                    <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />177 Khánh Hội, P. 3, Q. 4</td>
                  </tr>
                  <tr >
                    <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871011785</td>
                    <td className={cx('cs-line')}>-</td>
                    <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />785 Trần Hưng Đạo, P.1, Q.5, TP. HCM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
