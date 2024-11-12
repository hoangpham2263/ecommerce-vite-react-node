import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'
import { useState } from 'react'

const cx = classNames.bind(styles)

const DisplayImages = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleThumbnailClick = (index) => {
    setActiveIndex(index)
  }
  return (
    <span>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          {product?.configs && product?.configs[0]?.images?.map((item, index) => {
            return (
              <div
                key={index}
                className={cx('carousel-item', 'cs-img-bl', { active: index === activeIndex })}
              >
                <img src={item?.url} className={cx('cs-img')} alt="..." />
              </div>
            )
          })}
        </div>
        <button className={cx('carousel-control-prev', 'justify-content-start')} type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className={cx('visually-hidden')}>Previous</span>
        </button>
        <button className={cx('carousel-control-next', 'justify-content-end')} type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className={cx('visually-hidden')}>Next</span>
        </button>
      </div>
      <div className={cx('row', 'mt-3', 'px-2')}>
        {product?.configs && product?.configs[0]?.images?.map((item, index) => {
          return (
            <img
              key={index}
              src={item?.url}
              className={cx('cs-img-des', 'col-1', 'p-0')}
              alt="..."
              onClick={() => handleThumbnailClick(index)}
            />
          )
        })}
      </div>
    </span>
  )
}

export default DisplayImages
