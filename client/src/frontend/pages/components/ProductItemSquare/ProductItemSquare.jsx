import classNames from 'classnames/bind'
import styles from './ProductItemSquare.module.scss'

const cx = classNames.bind(styles)

const ProductItemSquare = ({ title, data }) => {
  return (
    <div className={cx('container', 'p-1', 'mb-4')}>
      <div className={cx('row ', 'mb-1', 'd-flex align-items-center')}>
        <h3 className={cx('col-4', 'm-0')}>{title}</h3>
        <div className={cx('col-8', 'text-end')}>
          <a type="button" className={cx('btn', 'cs-brand-item', 'me-2')}>Xem tất cả</a>
        </div>
      </div>
      <div className={cx('d-flex', 'gap-3', 'flex-wrap')}>
        {data && data.map((item, index) => {
          return (
            <div key={`square-${index}`} className={cx('square-block', item?.csSize ? 'cs-size-bl' : '')} style={{ backgroundColor: item?.bgColor }}>
              <div className={cx('title')}>{item?.title}</div>
              <img className={cx('img', item?.csSize ? 'cs-size' : '')} src={item?.img} />
            </div>
          )
        })}
      </div>
    </div >
  )
}

export default ProductItemSquare
