import { useNavigate } from 'react-router-dom'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import Rating from '@mui/material/Rating'
import Checkbox from '@mui/material/Checkbox'
import config from '../../../config'
import classNames from 'classnames/bind'
import styles from './ProductItemRandom.module.scss'
import { readImage, readProduct } from '../../../services/publicApi'
import { useEffect, useState } from 'react'
const cx = classNames.bind(styles)

const ProductItemRandom = () => {
  const navigate = useNavigate()

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [products, setProducts] = useState(null)
  const [currentProductPage, setCurrentProductPage] = useState(1)
  const [totalProductPages, setTotalProductPages] = useState(0)

  const limitPage = {
    product: 12
  }

  const handleFavoriteClick = (event) => {
    event.stopPropagation()
  }
  const handlePageChange = (setPage, currentPage, totalPages, direction) => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const fetchProductData = async () => {
    const fetchDataImage = await readImage(1, 100)
    const fetchDataProduct = await readProduct(currentProductPage, limitPage.product)
    const imageData = fetchDataImage?.data?.data?.image
    const productData = fetchDataProduct?.data?.data?.product

    const imagesByProductId = imageData.reduce((acc, image) => {
      if (!acc[image.product_id]) {
        acc[image.product_id] = []
      }
      acc[image.product_id].push(image)
      return acc
    }, {})
    const groupedProducts = productData.map((product) => {
      return {
        ...product,
        images: imagesByProductId[product.id] || []
      }
    })
    setProducts(groupedProducts)
    setTotalProductPages(fetchDataProduct?.data?.data?.totalPages)
  }

  useEffect(() => {
    fetchProductData()
  }, [currentProductPage])

  return (
    <div className={cx('container')}>
      <div className={cx('row ', 'mb-3', 'd-flex align-items-center')}>
        <h3 className={cx('col-4', 'm-0')}>Tham Khảo Thêm</h3>
        <div className={cx('col-8', 'text-end')}>
        </div>
      </div>
      <div className='row'>
        <div className={cx('col-2', 'w-100', 'text-dark')}>
          <span>
            <div className={cx('row', 'd-flex', 'flex-wrap', 'grid', 'pb-3')}>
              {products && products.map((item, index) => (
                <div key={index} onClick={(event) => { event.stopPropagation(); window.location.href = `/${item?.slug}` }} className={cx('col-2', 'pt-0', 'pb-2', 'px-1')}>
                  <div className={cx('cs-list-item', 'bg-white', 'text-decoration-none', 'text-dark')}>
                    <div className={cx('cs-item-block')}>
                      <div className={cx('cs-card')}>
                        <div className={cx('cs-item-pic')}>
                          <img className={cx('cs-item-pic-content')} src={item?.images[0]?.url || ''} alt='Product' />
                        </div>
                        <div className={cx('cs-card-body')}>
                          <button
                            onClick={(event) => {
                              event.stopPropagation()
                              navigate(config.routes.homeAdmin)
                            }}
                            className={cx('cs-custom-btn', 'codepro-custom-btn', 'codepro-btn-3', 'me-2', 'text-decoration-none', 'text-white', 'text-center')}
                          >
                            ADD TO CART
                          </button>
                          <button
                            onClick={(event) => {
                              event.stopPropagation()
                              navigate(config.routes.homeAdmin)
                            }}
                            className={cx('cs-custom-btn', 'codepro-custom-btn', 'codepro-btn-3', 'text-decoration-none', 'text-white', 'text-center')}
                          >
                            QUICK VIEW
                          </button>
                        </div>
                      </div>
                      <div className={cx('cs-item-desc')}>
                        <div className={cx('cs-item-desc-title')}>
                          <div className={cx('cs-item-desc-content')}>⚡️ Giá Sốc ⚡️ {item?.Brand?.name} {item?.Version?.name} {item?.Capacity?.name} {item?.Color?.name}</div>
                        </div>
                        <div className={cx('cs-item-desc-voucher', 'd-flex')}>
                          <div className={cx('cs-voucher')}>Rẻ Vô Địch</div>
                          <div className={cx('cs-voucher')}>#ShopXuHuong</div>
                        </div>
                        <div className={cx('cs-item-desc-price')}>
                          <div className={cx('cs-item-desc-price-sale')}>
                            <span className={cx('cs-unit')}>₫</span> <span className={cx('cs-price')}>{item?.price}</span>
                          </div>
                          <div className={cx('cs-item-desc-price-origin')}>₫{item?.price}</div>
                          <div className={cx('cs-item-desc-price-percent')}>
                            <div className={cx('cs-box-percent')}>
                              <span className={cx('cs-content-percent')}>-{item?.discount}%</span>
                            </div>
                          </div>
                        </div>
                        <div className={cx('cs-item-rating', 'd-flex', 'align-items-center')}>
                          <div className={cx('cs-item-rating-start', 'me-2')}>
                            <Rating name="size-small" value={4} size="small" readOnly />
                          </div>
                          <div className={cx('cs-item-sell')}>Đã bán 366,2k</div>
                        </div>
                        <div className={cx('cs-item-located', 'd-flex', 'align-items-center', 'justify-content-between')}>
                          <div className={cx('cs-destination')}>TP. Hồ Chí Minh</div>
                          <div>
                            <Checkbox {...label} onClick={handleFavoriteClick} icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={cx('product__price--percent')}>
                      <img className={cx('product__price--percent')} src='https://res.cloudinary.com/dqhj1sukr/image/upload/v1730468046/uploadLocal_ecommerce/azxoe0ipn6yl0hifhdhz.png' />
                      <p className={cx('product__price--percent-detail')}>
                        Giảm&nbsp;{item?.discount}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductItemRandom
