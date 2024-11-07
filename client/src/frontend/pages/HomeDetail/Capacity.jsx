import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'

const cx = classNames.bind(styles)

const Capacity = () => {
  return (
    <div className={cx('row', 'mb-1', 'pe-1')}>
      <div className={cx('col-md-3', 'pe-1')}>
        <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3')}>
          <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
          <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
        </div>
      </div>
      <div className={cx('col-md-3', 'pe-1')}>
        <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3')}>
          <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
          <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
        </div>
      </div>
      <div className={cx('col-md-3', 'pe-1')}>
        <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3')}>
          <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
          <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
        </div>
      </div>
      <div className={cx('col-md-3', 'pe-1')}>
        <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3')}>
          <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
          <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
        </div>
      </div>
    </div>
  )
}

export default Capacity
