import { useContext } from 'react'
import classNames from 'classnames/bind'
import styles from './ProductItem.module.scss'
import { useNavigate } from 'react-router-dom'

import { ToggleSearchFullscreenContext } from '../../Header/Header'
import { SearchValueContext } from '../Search'

const cx = classNames.bind(styles)

const ProductItem = ({ product }) => {
  const ToggleSearch = useContext(ToggleSearchFullscreenContext)
  const setSearchValue = useContext(SearchValueContext)
  const navigate = useNavigate()
  // const priceDiscount = product && product.price - product.price * (product.percentDiscount / 100)

  const handleDetailProduct = () => {
    navigate(`/${product.slug}`)
    ToggleSearch()
    setSearchValue('')
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  const formatNumber = (number) => {
    return number.toLocaleString('vi-VN')
  }

  return (
    <div className={cx('wrapper')} onClick={handleDetailProduct}>
      <div className={cx('avatar')}>
        {
          product?.configs && <img src={product?.configs[0] && product?.configs[0].images[0].url} alt='error' className={cx('avatar-img')} />
        }
      </div>
      <div className={cx('content')}>
        <div className={cx('title')}>{product?.title}</div>
        <div className={cx('price')}>
          <div className={cx('price-new')}>
            {product && formatNumber(product?.configs[0] && product?.configs[0].price)} <span>₫</span>
          </div>
          <div className={cx('price-old')}>
            {product && formatNumber(product?.configs[0] && product?.configs[0].price)} <span>₫</span>
          </div>
          <div className={cx('price-percent')}>-{product?.configs[0] && product?.configs[0].discount}%</div>
        </div>
        <div className={cx('price')}></div>
      </div>
    </div>
  )
}

export default ProductItem
