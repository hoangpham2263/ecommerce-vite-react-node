import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { readImage, readProduct, readProductDetail } from '../../services/publicApi'
import './HomeDetail.css'
import styles from './HomeDetail.module.scss'
import Specifications from './Specifications'
import Security from './Security'
import Sale from './Sale'
import SlideRight from './SlideRight'
import Assessment from './Assessment'
import UuDai from './UuDai'
import Button from './Button'
import OldToNew from './OldToNew'
import Capacity from './Capacity'
import Color from './Color'
import ProductInfo from './ProductInfo'
import DisplayImages from './DisplayImages'
import ProductItemRandom from '../components/ProductItemRandom'

const cx = classNames.bind(styles)

const HomeDetail = () => {

  const [product, setProduct] = useState({})
  const { slug } = useParams()

  const fetchProductData = async () => {
    const fetchDataImage = await readImage(1, 10000)
    const fetchDataProduct = await readProductDetail(slug)

    const imageData = fetchDataImage?.data?.data?.image
    const productData = fetchDataProduct?.data?.data
    const filteredImages = await imageData.filter(prod => prod?.product_id === productData.id)
    const imagesDetail = [...filteredImages]
    const groupedProducts = {
      ...productData,
      images: filteredImages,
      imagesDetail: imagesDetail
    }
    setProduct(groupedProducts)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchProductData()
  }, [slug])

  const fetchProductCapacity = async () => {
    const fetchDataProduct = await readProduct({ categoryId: product?.category_id, brandId: product?.brand_id, versionId: product?.version_id })
    console.log(fetchDataProduct)
  }
  useEffect(() => {
    fetchProductCapacity()
  }, [product])

  return (
    <div className={cx('wrapper', 'container')}>
      {/* <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 pt-3">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Demo</a></li>
          <li className="breadcrumb-item active" aria-current="page">{product?.title}</li>
        </ol>
      </nav> */}
      <h5 className={cx('pt-4', 'm-0')}>{product?.title}</h5>
      <hr className={cx('cs-line')} />
      <div className={cx('row', 'mb-2')}>
        {/* col left */}
        <div className={cx('col-md-7')}>
          <DisplayImages product={product} />
          <ProductInfo />
          <hr />
          <Specifications />
        </div>
        {/* col right */}
        <div className={cx('col-md-5')}>
          <Capacity />
          <Color product={product} />
          <OldToNew />
          <SlideRight />
          <Sale />
          <p className={cx('my-0', 'ps-1', 'fw-light', 'cs-sale-size', 'fst-italic', 'mb-2')}>Sản phẩm đang tạm hết hàng tại khu vực bạn đang chọn, vui lòng chuyển về <span className={cx('fw-medium', 'cs-sale-size')}>Bình Dương, Đồng Nai, Tiền Giang, Tây Ninh,</span> ... để đặt hàng online</p>
          <Button product={product} />
          <UuDai />
          <Security />
          <Assessment product={product} />
        </div>
      </div >
      <hr />
      <ProductItemRandom />

    </div >
  )
}

export default HomeDetail
