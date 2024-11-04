import classNames from 'classnames/bind'
import styles from './ProductItemTechnologyNews.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const ProductItemTechnologyNews = ({ title, data }) => {
  return (
    <div className={cx('container', 'p-1', 'mb-4', 'px-0')}>
      <div className={cx('row ', 'mb-1', 'd-flex align-items-center')}>
        <h3 className={cx('col-4', 'm-0')}>{title}</h3>
        <div className={cx('col-8', 'text-end')}>
          <Link className={cx('btn', 'cs-brand-item', 'me-2')}>Xem tất cả</Link>
        </div>
      </div>
      <div className={cx('d-flex', 'flex-wrap', 'gap-3')}>
        {data && data.map((item, index) => {
          return (
            <div key={`square-${index}`} className={cx('square-block', 'p-1', item?.csSize ? 'cs-size-bl' : '')} style={{ backgroundColor: item?.bgColor }}>
              <img className={cx('img', item?.csSize ? 'cs-size' : '')} src={item?.img} />
              <h5 className={cx('desc', 'pt-2', 'px-2')}>{item?.title}</h5>
            </div>
          )
        })}
      </div>
    </div >
  )
}

export default ProductItemTechnologyNews
