import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'
import { GoShieldCheck } from 'react-icons/go'

const cx = classNames.bind(styles)

const Security = () => {
  return (
    <span>
      <div className={cx('row', 'mb-3')}>
        <div className={cx('col-md-12')}>
          <div className={cx('cs-security')}>
            <div className={cx('bl-1', 'p-2')}>
              <GoShieldCheck className={cx('cs-icon')} />
              <div className={cx('cs-desc')}>
                <p className={cx('cs-desc-size-16', 'fw-medium', 'mb-2')}>Bảo vệ sản phẩm toàn diện với dịch vụ bảo hành mở rộng <a className={cx('text-danger', 'cs-desc-size-12', 'text-decoration-underline')}>Xem chi tiết</a></p>
                <p className={cx('cs-desc-size-12', 'fw-light')}>(Khách hàng đăng ký thông tin để được hỗ trợ tư vấn và thanh toán tại cửa hàng nhanh nhất, số tiền phải thanh toán chưa bao gồm giá trị của gói bảo hành mở rộng)</p>
              </div>
            </div>
            <div className={cx('bl-2', 'p-2', 'cs-cursor', 'pb-0')}>
              <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault1">
                <div className="form-check">
                  <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault1">
                    <p className={cx('m-0', 'cs-cursor')}>Gói 1 năm bảo hành Samsung Care+</p>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                      <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>2.029.000 đ</p>
                      <a className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'cs-text-decoration')}>xem chi tiết</a>
                    </div>
                  </label>
                </div>
              </label>
            </div>
            <div className={cx('bl-2', 'p-2', 'cs-cursor', 'pb-0')}>
              <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault2">
                <div className="form-check">
                  <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                  <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault2">
                    <p className={cx('m-0', 'cs-cursor')}>Rơi vỡ - Rớt nước: Hỗ trợ 90% chi phí sửa chữa, đổi mới sản phẩm nếu hư hỏng nặng trong 12 tháng</p>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                      <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>2.400.000 đ</p>
                      <a className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'text-decoration-none')}>xem chi tiết</a>
                    </div>
                  </label>
                </div>
              </label>
            </div>
            <div className={cx('bl-2', 'p-2', 'cs-cursor', 'pb-0')}>
              <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault3">
                <div className="form-check">
                  <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                  <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault3">
                    <p className={cx('m-0', 'cs-cursor')}>Gói 2 năm bảo hành Samsung Care+</p>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                      <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>3.399.000 đ</p>
                      <a className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'text-decoration-none')}>xem chi tiết</a>
                    </div>
                  </label>
                </div>
              </label>
            </div>
            <div className={cx('bl-2', 'p-2', 'cs-cursor', 'pb-0')}>
              <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault4">
                <div className="form-check">
                  <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                  <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault4">
                    <p className={cx('m-0', 'cs-cursor')}>Gói 6 tháng bảo hành Samsung Care+</p>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                      <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>1.299.000 đ</p>
                      <a className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'text-decoration-none')}>xem chi tiết</a>
                    </div>
                  </label>
                </div>
              </label>
            </div>
            <div className={cx('bl-2', 'p-2', 'cs-cursor', 'pb-0')}>
              <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault5">
                <div className="form-check">
                  <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault5" />
                  <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault5">
                    <p className={cx('m-0', 'cs-cursor')}>1 đổi 1 VIP 6 tháng: Đổi máy mới tương đương khi có lỗi từ NSX trong 6 tháng</p>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                      <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>1.300.000 đ</p>
                      <a className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'text-decoration-none')}>xem chi tiết</a>
                    </div>
                  </label>
                </div>
              </label>
            </div>
            <div className={cx('bl-2', 'p-2', 'cs-cursor', 'pb-0')}>
              <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault6">
                <div className="form-check">
                  <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault6" />
                  <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault6">
                    <p className={cx('m-0', 'cs-cursor')}>S24+ 12 tháng: Đổi sản phẩm tương đương hoặc miễn phí chi phí sửa chữa nếu có lỗi của NSX khi hết hạn bảo hành trong 12 tháng</p>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                      <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>1.600.000 đ</p>
                      <a className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'text-decoration-none')}>xem chi tiết</a>
                    </div>
                  </label>
                </div>
              </label>
            </div>
            <div className={cx('bl-2', 'p-2', 'cs-cursor')}>
              <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault7">
                <div className="form-check">
                  <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault7" />
                  <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault7">
                    <p className={cx('m-0', 'cs-cursor')}>1 đổi 1 VIP 12 tháng: Đổi máy mới tương đương khi có lỗi từ NSX trong 12 tháng</p>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                      <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>1.800.000 đ</p>
                      <a className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'text-decoration-none')}>xem chi tiết</a>
                    </div>
                  </label>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </span>
  )
}

export default Security
