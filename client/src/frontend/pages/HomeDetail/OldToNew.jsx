import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'
import { FiRefreshCw } from 'react-icons/fi'


const cx = classNames.bind(styles)

const OldToNew = () => {
  return (
    <div className={cx('row', 'mb-3', 'cs-old-new', 'px-0', 'py-2', 'mx-0')}>
      <div className={cx('col-md-6', 'ps-2')}>
        <div className={cx('px-2', 'd-lex', 'align-items-center', 'cs-old-new-btn-hover')}>
          <div className={cx('cs-cursor-link', 'text-center', 'py-1', 'd-flex', 'align-items-center', 'justify-content-center')}>
            <FiRefreshCw className={cx('fs-3', 'me-3')} />
            <div >
              <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-medium', 'cs-old-new-top')}>25.990.000đ</p>
              <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-normal', 'cs-old-new-bot')}>Khi thu cũ lên đời</p>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('col-md-6', 'pe-2')}>
        <div className={cx('d-lex', 'align-items-center', 'cs-old-new-btn-hover', 'cs-old-new-btn')}>
          <div className={cx('cs-cursor-link', 'text-center', 'py-1')}>
            <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-medium', 'text-danger', 'cs-old-new-top')}>27.990.000đ</p>
            <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-normal', 'text-decoration-line-through', 'cs-old-new-bot')}>33.990.000đ</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OldToNew
