import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'
import { FaGift } from 'react-icons/fa'

const cx = classNames.bind(styles)

const Sale = () => {
  return (
    <span>
      <div className={cx('row', 'mb-3')}>
        <div className={cx('col-md-12')}>
          <div className={cx('cs-prod-sale')}>
            <div className={cx('d-flex', 'align-items-center', 'cs-sale-title', 'p-2')}>
              <FaGift className={cx('me-2', 'fs-4', 'mb-1', 'cs-text-danger')} />
              <h5 className={cx('m-0', 'cs-text-danger', 'text-normal', 'cs-sale-size')}>Khuyến mãi</h5>
            </div>
            <div className={cx('d-flex', 'align-items-center', 'p-2')}>
              <span className={cx('me-2', 'cs-sale-stt')} >1</span>
              <p className={cx('m-0', 'cs-size-desc')}>Giảm 1.000.000đ qua QR bank</p>
            </div>
            <div className={cx('d-flex', 'align-items-center', 'p-2')}>
              <span className={cx('me-2', 'cs-sale-stt')} >2</span>
              <p className={cx('m-0', 'cs-size-desc')}>Trả góp 0% đến 12 tháng, 0đ trả trước qua Samsung Finance+</p>
            </div>
            <div className={cx('d-flex', 'align-items-start', 'p-2')}>
              <span className={cx('me-2', 'cs-sale-stt')} >3</span>
              <p className={cx('m-0', 'cs-size-desc')}>Giảm ngay 200K khi mua Samsung Fit 3 (không áp dụng cùng giảm giá qua galaxy gift, xem chi tiết sản phẩm và điều kiện áp dụng tại đây)</p>
            </div>
            <div className={cx('d-flex', 'align-items-center', 'p-2')}>
              <span className={cx('me-2', 'cs-sale-stt')} >4</span>
              <p className={cx('m-0', 'cs-size-desc')}>Quyền lợi bảo hành rơi vỡ rơi nước 12 tháng tại CellphoneS</p>
            </div>
          </div>
        </div>
      </div>
    </span>
  )
}

export default Sale
