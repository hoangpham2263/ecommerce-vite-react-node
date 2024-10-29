import ItemProductDisplay from '../ItemProductDisplay'
import styles from './HotSale.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const HotSale = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('cs-hot-sale-bg', 'p-2')}>
        <div className={cx('row', 'd-flex', 'align-items-center', 'justify-content-between', 'mt-2')}>
          <div className={cx('col-4')}>
            <img className={cx('cs-hot-sale-img')} src='https://res.cloudinary.com/dqhj1sukr/image/upload/v1730135710/uploadLocal_ecommerce/kkxbtg4d93ay64s8bff1.gif' alt='Hot Sale Banner' />
          </div>
          <div className={cx('col-3', 'd-flex', 'justify-content-end', 'me-3')}>
            <div className={cx('cs-btn-hot-sale', 'gl-bg-white', 'me-3')}>Điện thoại, Tablet</div>
            <div className={cx('cs-btn-hot-sale')}>Phụ kiện, TV</div>
          </div>
        </div>
        <div className={cx('row')}>
          <div className={cx('cs-hot-sale-time', 'pb-4')}>
            Kết thúc sau: <span className={cx('cs-circle-time')}>02</span> : <span className={cx('cs-circle-time')}>04</span> : <span className={cx('cs-circle-time')}>55</span> : <span className={cx('cs-circle-time')}>15</span>
          </div>
        </div>
        <ItemProductDisplay />
      </div>
    </div>
  )
}

export default HotSale
