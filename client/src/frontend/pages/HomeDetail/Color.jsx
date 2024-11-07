import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'

const cx = classNames.bind(styles)

const Color = ({ product }) => {
  return (
    <span>
      <p className={cx('mb-2', 'd-flex', 'align-items-center', 'fw-medium')}>Chọn màu để xem giá và chi nhánh có hàng</p>
      <div className={cx('row', 'mb-1', 'pe-1')}>
        <div className={cx('col-md-3', 'pe-1')}>
          <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3', 'd-flex', 'align-items-center', 'justify-content-center')}>
            <img src={product && product?.imagesDetail && product?.imagesDetail[0]?.url} className={cx('cs-img-capacity')} alt="..." />
            <div >
              <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
              <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
            </div>
          </div>
        </div>
        <div className={cx('col-md-3', 'pe-1')}>
          <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3', 'd-flex', 'align-items-center', 'justify-content-center')}>
            <img src={product && product?.imagesDetail && product?.imagesDetail[0]?.url} className={cx('cs-img-capacity')} alt="..." />
            <div >
              <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
              <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
            </div>
          </div>
        </div>
        <div className={cx('col-md-3', 'pe-1')}>
          <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3', 'd-flex', 'align-items-center', 'justify-content-center')}>
            <img src={product && product?.imagesDetail && product?.imagesDetail[0]?.url} className={cx('cs-img-capacity')} alt="..." />
            <div >
              <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
              <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
            </div>
          </div>
        </div>
        <div className={cx('col-md-3', 'pe-1')}>
          <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3', 'd-flex', 'align-items-center', 'justify-content-center')}>
            <img src={product && product?.imagesDetail && product?.imagesDetail[0]?.url} className={cx('cs-img-capacity')} alt="..." />
            <div >
              <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
              <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
            </div>
          </div>
        </div>
        <div className={cx('col-md-3', 'pe-1')}>
          <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3', 'd-flex', 'align-items-center', 'justify-content-center')}>
            <img src={product && product?.imagesDetail && product?.imagesDetail[0]?.url} className={cx('cs-img-capacity')} alt="..." />
            <div >
              <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
              <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
            </div>
          </div>
        </div>
      </div>
    </span>
  )
}

export default Color
