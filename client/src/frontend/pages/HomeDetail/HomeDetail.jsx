import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { readProduct, readProductDetail } from '../../services/publicApi'
import './HomeDetail.css'
import styles from './HomeDetail.module.scss'
import Specifications from './Specifications'
import Security from './Security'
import Sale from './Sale'
import SlideRight from './SlideRight'
import Assessment from './Assessment'
import UuDai from './UuDai'
import OldToNew from './OldToNew'
import ProductInfo from './ProductInfo'
import DisplayImages from './DisplayImages'
import Button from './Button'
import ProductItem from '../components/ProductItem'

const cx = classNames.bind(styles)

const HomeDetail = () => {

  const { slug } = useParams()
  const [product, setProduct] = useState({})
  const [productForCategory, setProductForCategory] = useState({})
  const [selectConfig, setSelectConfig] = useState(0)

  // ---------- product ----------
  const fetchProductData = async () => {
    const fetchDataProduct = await readProductDetail(slug)
    setProduct(fetchDataProduct?.data?.data)
    fetchProductCategory({
      categoryId: fetchDataProduct?.data?.data.category_id,
      brandId: fetchDataProduct?.data?.data.brand_id,
      versionId: fetchDataProduct?.data?.data.version_id
    })
  }
  useEffect(() => {
    fetchProductData()
  }, [slug])

  // ---------- product for category ----------
  const fetchProductCategory = async ({ categoryId, brandId, versionId }) => {
    const fetchDataProduct = await readProduct({ categoryId, brandId, versionId })
    setProductForCategory(fetchDataProduct?.data?.data)
  }
  const handleSelectCategory = (item, index) => {
    window.location.href = `/${item?.slug}`
  }

  // ---------- color ----------
  const formatNumber = (number) => {
    return number.toLocaleString('vi-VN')
  }
  const handleSelectColor = (item, index) => {
    setSelectConfig(index)
  }

  return (
    <div className={cx('wrapper', 'container')}>
      <h5 className={cx('pt-4', 'm-0')}>{product?.title}</h5>
      <hr className={cx('cs-line')} />
      <div className={cx('row', 'mb-2')}>
        {/* ---------- col left ---------- */}
        <div className={cx('col-md-7')}>
          <DisplayImages product={product} selectConfig={selectConfig} />
          <ProductInfo />
          <hr />
          <Specifications />
        </div>
        {/* ---------- col right ---------- */}
        <div className={cx('col-md-5')}>
          {/* ---------- product for category ---------- */}
          <div className={cx('row', 'mb-1', 'pe-1')}>
            {productForCategory && Array.isArray(productForCategory) && productForCategory.map((item, index) => {
              return (
                <div key={index} className={cx('col-md-3', 'pe-1')} onClick={() => handleSelectCategory(item, index)}>
                  <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3', { 'active-select-color': item?.slug === slug })}>
                    <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-medium', 'cs-text-capacity')}>{item?.Ram?.name} {item?.Capacity?.name}</p>
                    <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-lighter', 'cs-text-capacity')}>{formatNumber(item?.configs[0]?.price)} đ</p>
                  </div>
                </div>
              )
            })}
          </div>
          {/* ---------- color ---------- */}
          <p className={cx('mb-2', 'd-flex', 'align-items-center', 'fw-medium')}>Chọn màu để xem giá và chi nhánh có hàng</p>
          <div className={cx('row', 'mb-1', 'pe-1')}>
            {product?.configs && product?.configs.map((item, index) => {
              return (
                <div key={index} className={cx('col-md-3', 'pe-1')} onClick={() => handleSelectColor(item, index)}>
                  <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3', 'd-flex', 'align-items-center', 'justify-content-center', { 'active-select-color': selectConfig === index })}>
                    <img src={item?.images[0].url} className={cx('cs-img-capacity')} alt="..." />
                    <div >
                      <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-medium', 'cs-text-capacity')}>{product?.Ram?.name} {product?.Capacity?.name}</p>
                      <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-lighter', 'cs-text-capacity')}>{formatNumber(item?.price)} đ</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <OldToNew product={product} selectConfig={selectConfig} />
          <SlideRight />
          <Sale />
          <p className={cx('my-0', 'ps-1', 'fw-light', 'cs-sale-size', 'fst-italic', 'mb-2')}>
            Sản phẩm đang tạm hết hàng tại khu vực bạn đang chọn, vui lòng chuyển về
            <span className={cx('fw-medium', 'cs-sale-size')}>Bình Dương, Đồng Nai, Tiền Giang, Tây Ninh,</span> ... để đặt hàng online
          </p>
          <Button product={product} selectConfig={selectConfig} />
          <UuDai />
          <Security />
          <Assessment product={product} />
        </div>
      </div >
      <hr />
      <ProductItem />
    </div >
  )
}

export default HomeDetail
