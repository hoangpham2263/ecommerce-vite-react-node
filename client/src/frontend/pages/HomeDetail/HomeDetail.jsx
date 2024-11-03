import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'
import { useEffect, useState } from 'react'
import { readImage, readProductDetail } from '../../services/publicApi'
import { Link, useParams } from 'react-router-dom'
import './HomeDetail.css'

const cx = classNames.bind(styles)

const HomeDetail = () => {
  const [product, setProduct] = useState({})
  const { slug } = useParams()

  const fetchProductData = async () => {
    try {
      const fetchDataImage = await readImage(1, 100)
      const fetchDataProduct = await readProductDetail(slug)

      const imageData = fetchDataImage?.data?.data?.image
      const productData = fetchDataProduct?.data?.data

      const acc = []
      if (imageData) {
        imageData.forEach((prod) => {
          if (prod?.product_id === productData?.id) { acc.push(prod) }
        })
      }

      const groupedProducts = {
        ...productData,
        images: acc
      }

      setProduct(groupedProducts)
    } catch (error) {
      console.error('Error fetching product data:', error)
    }
  }

  useEffect(() => { fetchProductData() }, [slug])

  return (
    <div className={cx('wrapper', 'container')}>
      <h5 className={cx('pt-4', 'm-0')}>{product?.title}</h5>
      <hr className={cx('cs-line')} />
      <div className={cx('row')}>
        <div className={cx('col-md-7')}>
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className={cx('carousel-item', 'active', 'cs-img-bl')}>
                <img src={product?.images?.shift()?.url?.shift()} className={cx('cs-img')} alt="..." />
              </div>
              {product?.images?.map((item, index) => {
                return (
                  <div key={index} className={cx('carousel-item', 'cs-img-bl')}>
                    <img src={item?.url?.shift()} className={cx('cs-img')} alt="..." />
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
        </div>
        <div className={cx('col-md-5')}>
          
        </div>
      </div>
    </div>
  )
}

export default HomeDetail
