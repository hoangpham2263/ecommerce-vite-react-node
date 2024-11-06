import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'
import { MdAddShoppingCart } from 'react-icons/md'


const cx = classNames.bind(styles)

const Button = () => {
  return (
    <div className={cx('row')}>
      <div className={cx('col-md-10', 'pe-1', 'mb-2')}>
        <button type="button" className={cx('btn btn-danger w-100', 'cs-hight-60')}>
          <p className={cx('m-0', 'cs-btn-size-16')}>MUA NGAY</p>
          <p className={cx('m-0', 'cs-btn-size-14')}>(Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)</p>
        </button>
      </div>
      <div className={cx('col-md-2', 'ps-1', 'mb-2')}>
        <button type="button" className={cx('btn btn-danger w-100', 'cs-hight-60', 'cs-btn-cart')}>
          <MdAddShoppingCart className={cx('cs-icon-cart')} />
          <p className={cx('m-0', 'cs-btn-text-cart')}>Thêm vào giỏ</p>
        </button>
      </div>
      <div className={cx('col-md-6', 'pe-1', 'mb-2')}>
        <button type="button" className={cx('btn btn-primary w-100', 'cs-hight-60')}>
          <p className={cx('m-0', 'cs-btn-size-14')}>TRẢ GÓP 0%</p>
          <p className={cx('m-0', 'cs-btn-size-12')}>Trả trước chỉ từ 0đ</p>
        </button>
      </div>
      <div className={cx('col-md-6', 'ps-1', 'mb-2')}>
        <button type="button" className={cx('btn btn-primary w-100', 'cs-hight-60')}>
          <p className={cx('m-0', 'cs-btn-size-14')}>TRẢ GÓP 0% QUA THẺ</p>
          <p className={cx('m-0', 'cs-btn-size-12')}>(Không phí chuyển đổi 3 - 6 tháng)</p>
        </button>
      </div>
      <div className={cx('col-md-12', 'mb-3')}>
        <button type="button" className={cx('btn btn-warning w-100', 'cs-hight-60', 'cs-btn-warning')}>
          <p className={cx('m-0', 'cs-btn-size-14')}>Thu cũ lên đời</p>
          <p className={cx('m-0', 'cs-btn-size-12')}>Chỉ từ 27.000.000đ</p>
        </button>
      </div>
    </div>
  )
}

export default Button
