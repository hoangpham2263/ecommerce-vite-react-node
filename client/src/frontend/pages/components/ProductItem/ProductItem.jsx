import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import { toast } from 'react-toastify'
import Favorite from '@mui/icons-material/Favorite'
import Rating from '@mui/material/Rating'
import Checkbox from '@mui/material/Checkbox'

import styles from './ProductItem.module.scss'
import config from '../../../config'
import { addCart, readImage, readProduct } from '../../../services/publicApi'
import { LocalStorageGetInfo } from '../../../../main/components/LocalStorageMethod'
import useFetchAmountCart from '../../../hooks/useFetchAmountCart'
const cx = classNames.bind(styles)

const ProductItem = ({ stt }) => {
  // ---------- init variable ----------
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [products, setProducts] = useState(null)
  const [productCurrent, setProductCurrent] = useState({})
  const [currentProductPage, setCurrentProductPage] = useState(1)
  const [totalProductPages, setTotalProductPages] = useState(0)

  // ---------- navigation ----------
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

  // ---------- add cart ----------
  const closeButtonRef = useRef(null)
  const LocalStorageGetInfos = LocalStorageGetInfo() || {}
  const [quantity, setQuantity] = useState(1)

  const fetchAmountCart = useFetchAmountCart()
  useEffect(() => { fetchAmountCart() }, [])

  const handleRemoveBackdrop = (item) => {
    setProductCurrent(item)
    const modalBackdrops = document.querySelectorAll('.modal-backdrop.fade.show')
    modalBackdrops.forEach((backdrop) => { backdrop.style.display = 'none' })
  }

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleAddProductToCartProd = async () => {
    const data = {
      UserId: LocalStorageGetInfos?.user?.id,
      ProductId: productCurrent?.id,
      quantity: quantity,
      total: productCurrent?.price * quantity
    }
    const fetchData = await addCart(data)
    if (fetchData?.data?.code === 0) {
      toast.success('Thêm vào giỏ hàng thành công')
      fetchAmountCart()
      closeButtonRef.current.click()
      setQuantity(1)
    }
  }
  // ---------- end add cart ----------

  // ---------- call api ----------
  const fetchProductData = async () => {
    const fetchDataImage = await readImage(1, 10000)
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
  useEffect(() => { fetchProductData() }, [currentProductPage])
  // ---------- end call api ----------

  return (
    <div className={cx('container')}>
      <div className={cx('row ', 'mb-3', 'd-flex align-items-center')}>
        <h3 className={cx('col-4', 'm-0')}>ĐIỆN THOẠI NỔI BẬT NHẤT</h3>
        <div className={cx('col-8', 'text-end')}>
          <button type="button" className={cx('btn', 'cs-brand-item', 'me-2')}>Second1</button>
          <button type="button" className={cx('btn', 'cs-brand-item', 'me-2')}>Second2</button>
          <button type="button" className={cx('btn', 'cs-brand-item', 'me-2')}>Second3</button>
          <button type="button" className={cx('btn', 'cs-brand-item', 'me-2')}>Second3</button>
          <button type="button" className={cx('btn', 'cs-brand-item', 'me-2')}>Second3</button>
          <button type="button" className={cx('btn', 'cs-brand-item', 'me-2')}>Second3</button>
          <button type="button" className={cx('btn', 'cs-brand-item', 'me-2')}>Second3</button>
          <button type="button" className={cx('btn', 'cs-brand-item', 'me-2')}>Second3</button>
          <button type="button" className={cx('btn', 'cs-brand-item', 'me-2')}>Second3</button>
        </div>
      </div>
      <div className='row'>
        <div className={cx('col-2', 'w-100', 'text-dark')}>
          <span>
            <div className={cx('row', 'd-flex', 'flex-wrap', 'grid', 'pb-3')}>
              {products && products.map((item, index) => (
                <div key={index} className={cx('col-2', 'pt-0', 'pb-2', 'px-1')}>
                  <div className={cx('cs-list-item', 'bg-white', 'text-decoration-none', 'text-dark')}>
                    <div className={cx('cs-item-block')}>
                      <div className={cx('cs-card')}>
                        <div className={cx('cs-item-pic')}>
                          <img className={cx('cs-item-pic-content')} src={item?.images[0]?.url || ''} alt='Product' />
                        </div>
                        <div className={cx('cs-card-body')}>
                          <button
                            type="button"
                            data-bs-toggle="modal" data-bs-target={`#cartModalProd-${stt}`} onClick={() => handleRemoveBackdrop(item)}
                            className={cx('cs-custom-btn', 'codepro-custom-btn', 'codepro-btn-3', 'me-2', 'text-decoration-none', 'text-white', 'text-center')}
                          >
                            ADD TO CART
                          </button>
                          <button
                            onClick={(event) => {
                              event.stopPropagation()
                              window.location.href = config.routes.homeAdmin
                            }}
                            className={cx('cs-custom-btn', 'codepro-custom-btn', 'codepro-btn-3', 'text-decoration-none', 'text-white', 'text-center')}
                          >
                            QUICK VIEW
                          </button>
                        </div>
                      </div>
                      <a className={cx('text-decoration-none text-dark', 'cs-item-desc')} href={`/${item?.slug}`} >
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
                      </a>
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
      {/* Modal */}
      <div>
        <div className={cx('modal fade', 'cs-cartModalProd')} id={`cartModalProd-${stt}`} tabIndex={-1} aria-labelledby={`cartModalProdLabel-${stt}`} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={`cartModalProdLabel-${stt}`}>Số lượng</h1>
                <button ref={closeButtonRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body text-center">
                <div className="btn-group btn-group-lg" role="group" aria-label="Large button group">
                  <button type="button" className="btn btn-outline-secondary" onClick={handleDecreaseQuantity}>-</button>
                  <button disabled type="button" className="btn btn-outline-secondary text-dark">{quantity}</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={handleIncreaseQuantity}>+</button>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                <button type="button" className="btn btn-primary" onClick={handleAddProductToCartProd}>Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
