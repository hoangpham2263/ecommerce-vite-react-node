import classNames from 'classnames/bind'
import styles from './ProductItemRectangle.module.scss'

const cx = classNames.bind(styles)

const ProductItemRectangle = ({ title, data }) => {
  return (
    <div className={cx('container', 'p-1', 'mb-4', 'px-0')}>
      <div className={cx('row ', 'mb-1', 'd-flex align-items-center')}>
        <h3 className={cx('col-4', 'm-0')}>{title}</h3>
      </div>
      <div className={cx('d-flex', 'flex-wrap')}>
        {data && data.map((item, index) => {
          return (
            <div key={`square-${index}`} className={cx('square-block', 'p-2', item?.csSize ? 'cs-size-bl' : '')} style={{ backgroundColor: item?.bgColor }}>
              <img className={cx('img', item?.csSize ? 'cs-size' : '')} src={item?.img} />
            </div>
          )
        })}
      </div>
    </div >
  )
}

export default ProductItemRectangle
