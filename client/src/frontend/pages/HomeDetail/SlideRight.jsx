import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'

const cx = classNames.bind(styles)

const SlideRight = () => {
  const dataSlideRight = [
    'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730785821/uploadLocal_ecommerce/slide%20right%201.webp',
    'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730785821/uploadLocal_ecommerce/slide%20right%202.webp',
    'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730785821/uploadLocal_ecommerce/slide%20right%201.webp',
    'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730785821/uploadLocal_ecommerce/slide%20right%202.webp'
  ]
  return (
    <span>
      <div className={cx('row', 'mb-3')}>
        <div className={cx('col-12')}>
          <div id="carouselExampleSlidesOnly" className={cx('carousel slide', 'cs-slide-right')} data-bs-ride="carousel">
            <div className="carousel-inner carousel-inner-right">
              <div className={cx('carousel-item', 'cs-img-bl-right', 'active')}>
                <img src={dataSlideRight[1]} className={cx('cs-img-right')} alt="..." />
              </div>
              {dataSlideRight.map((item, index) => {
                return (
                  <div key={index} className={cx('carousel-item', 'cs-img-bl-right')}>
                    <img src={item} className={cx('cs-img-right')} alt="..." />
                  </div>
                )
              })}
            </div>
            <button className={cx('carousel-control-prev', 'justify-content-start')} type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
              <span className="carousel-control-prev-icon carousel-control-prev-icon-right" aria-hidden="true" />
              <span className={cx('visually-hidden')}>Previous</span>
            </button>
            <button className={cx('carousel-control-next', 'justify-content-end')} type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
              <span className="carousel-control-next-icon carousel-control-next-icon-right" aria-hidden="true" />
              <span className={cx('visually-hidden')}>Next</span>
            </button>
          </div>
        </div>
      </div>
    </span>
  )
}

export default SlideRight
