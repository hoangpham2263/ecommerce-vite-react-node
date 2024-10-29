import styles from './Carousel.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const Carousel = () => {
  const carousels = [
    'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730136030/uploadLocal_ecommerce/carousels%201.webp',
    'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730136030/uploadLocal_ecommerce/carousels%204.webp',
    'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730136030/uploadLocal_ecommerce/carousels%203.webp',
    'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730136030/uploadLocal_ecommerce/carousels%202.webp',
  ]
  return (
    <div className={cx('container')}>
      <div className={cx('row')}>
        <div className={cx('col-3', 'd-flex', 'flex-column', 'justify-content-between')}>
          <img className={cx('d-block', 'w-100', 'cs-border-7', 'cs-box-shadow')} src='https://res.cloudinary.com/dqhj1sukr/image/upload/v1730136358/uploadLocal_ecommerce/carousels%20right%201.webp' />
          <img className={cx('d-block', 'w-100', 'cs-border-7', 'cs-box-shadow')} src='https://res.cloudinary.com/dqhj1sukr/image/upload/v1730136363/uploadLocal_ecommerce/carousels%20right%202.webp' />
        </div>
        <div className={cx('col-6', 'px-0')}>
          <div id="carouselExampleAutoplaying" className={cx('carousel', 'slide', 'cs-border-7', 'cs-box-shadow')} data-bs-ride="carousel">
            <div className={cx('carousel-inner', 'cs-border-7')}>
              <div className={cx('carousel-item', 'active')}>
                <img src={'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730136699/uploadLocal_ecommerce/carousels%200.webp'} className={cx('d-block', 'w-100')} alt="..." />
              </div>
              {carousels.map((carousel, index) => (
                <div key={index} className={cx('carousel-item')}>
                  <img src={carousel} className={cx('d-block', 'w-100')} alt="..." />
                </div>
              ))}
            </div>
            <button className={cx('carousel-control-prev')} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className={cx('carousel-control-prev-icon')} aria-hidden="true"></span>
              <span className={cx('visually-hidden')}>Previous</span>
            </button>
            <button className={cx('carousel-control-next')} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className={cx('carousel-control-next-icon')} aria-hidden="true"></span>
              <span className={cx('visually-hidden')}>Next</span>
            </button>
          </div>
        </div>
        <div className={cx('col-3', 'd-flex', 'flex-column', 'justify-content-between')}>
          <img className={cx('d-block', 'w-100', 'cs-border-7', 'cs-box-shadow')} src='https://res.cloudinary.com/dqhj1sukr/image/upload/v1730136358/uploadLocal_ecommerce/carousels%20right%201.webp' />
          <img className={cx('d-block', 'w-100', 'cs-border-7', 'cs-box-shadow')} src='https://res.cloudinary.com/dqhj1sukr/image/upload/v1730136363/uploadLocal_ecommerce/carousels%20right%202.webp' />
        </div>
      </div>
      <div className={cx('row')}>
        <div className={cx('my-3')}>
          <img className={cx('d-block', 'w-100', 'cs-border-7', 'cs-box-shadow')} src='https://res.cloudinary.com/dqhj1sukr/image/upload/v1730136589/uploadLocal_ecommerce/carousels%20bottom.gif' />
        </div>
      </div>
    </div>
  )
}

export default Carousel
