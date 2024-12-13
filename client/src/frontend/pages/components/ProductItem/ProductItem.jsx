import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import classNames from 'classnames/bind'
import styles from './ProductItem.module.scss'
import Favorite from '@mui/icons-material/Favorite'
import Rating from '@mui/material/Rating'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import { addCart, readProduct } from '../../../services/publicApi'
import useFetchAmountCart from '../../../hooks/useFetchAmountCart'
import ReactPaginateBlock from '../ReactPaginateBlock'
import config from '../../../config'
import { useAuth } from '../../../../main/context/AuthContext'

const cx = classNames.bind(styles)

const ProductItem = ({ data, stt }) => {
  // ---------- init variable ----------
  const [products, setProducts] = useState(null)
  const [productCurrent, setProductCurrent] = useState({})
  const [selectConfig, setSelectConfig] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(data?.limit || 12)
  const [totalPages, setTotalPages] = useState(0)
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const closeButtonRef = useRef(null)
  const { user } = useAuth()
  const LocalStorageGetInfos = user
  const [quantity, setQuantity] = useState(1)

  // ---------- navigation ----------
  const handlePageClick = (event) => { setCurrentPage(event.selected + 1) }
  useEffect(() => { setCurrentLimit(data?.limit || 12) }, [currentPage])

  // ---------- call api ----------
  const fetchProductData = async () => {
    const data = { page: currentPage, limit: currentLimit }
    const fetchDataProduct = await readProduct(data)
    setTotalPages(fetchDataProduct?.data?.data?.totalPages)
    setProducts(fetchDataProduct?.data?.data)
  }
  useEffect(() => { fetchProductData() }, [currentPage, currentLimit])

  // ---------- format number ----------
  const formatNumber = (number) => { return number.toLocaleString('vi-VN') }

  // ---------- handle favorite ----------
  const handleFavoriteClick = (event) => { event.stopPropagation() }

  // ---------- add cart ----------
  const fetchAmountCart = useFetchAmountCart()
  useEffect(() => { fetchAmountCart() }, [])
  const handleRemoveBackdrop = (item) => {
    setProductCurrent(item)
    const modalBackdrops = document.querySelectorAll('.modal-backdrop.fade.show')
    modalBackdrops.forEach((backdrop) => { backdrop.style.display = 'none' })
  }
  const handleIncreaseQuantity = () => { setQuantity(quantity + 1) }
  const handleDecreaseQuantity = () => { if (quantity > 1) { setQuantity(quantity - 1) } }
  const handleSelectConfig = (event) => { setSelectConfig(event.target.value) }

  const handleAddProductToCartProd = async () => {
    try {
      const data = {
        ProductId: productCurrent?.id,
        quantity: quantity,
        config_id: productCurrent.configs && productCurrent.configs[Number(selectConfig)]?.id
      }
      await addCart(data)
      toast.success('Thêm vào giỏ hàng thành công')
      fetchAmountCart()
      closeButtonRef.current.click()
      setQuantity(1)
      setSelectConfig(0)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  // ---------- render ----------
  return (
    <div className={cx('container mb-5')}>
      <div className={cx('row ', 'mb-3', 'd-flex align-items-center')}>
        <h3 className={cx('col-4', 'm-0')}>{data?.title && data?.title}</h3>
        <div className={cx('col-8', 'text-end')}>
          {data?.category && data?.category.map((item, index) => {
            return (
              <button key={`category-${index}`} type="button" className={cx('btn', 'cs-brand-item', 'me-2')}>{item?.name}</button>
            )
          })}
        </div>
      </div>
      <div className='row'>
        <div className={cx('col-2', 'w-100', 'text-dark')}>
          <span>
            <div className={cx('row', 'd-flex', 'flex-wrap', 'grid', 'pb-3')}>
              {products && products?.product.map((item, index) => {
                const randomConfig = Math.floor(Math.random() * (item?.configs.length))
                return (
                  <div key={index} className={cx('col-2', 'pt-0', 'pb-2', 'px-1')}>
                    <div className={cx('cs-list-item', 'bg-white', 'text-decoration-none', 'text-dark')}>
                      <div className={cx('cs-item-block')}>
                        <div className={cx('cs-card')}>
                          <div className={cx('cs-item-pic')}>
                            <img className={cx('cs-item-pic-content')} src={item?.configs[randomConfig]?.images[0]?.url || ''} alt='Product' />
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
                            <div className={cx('cs-item-desc-content')}>⚡️ Giá Sốc ⚡️ {item?.Brand?.name} {item?.Version?.name} {item?.Capacity?.name} {item?.configs[randomConfig]?.Color?.name}</div>
                          </div>
                          <div className={cx('cs-item-desc-voucher', 'd-flex')}>
                            <div className={cx('cs-voucher')}>Rẻ Vô Địch</div>
                            <div className={cx('cs-voucher')}>#ShopXuHuong</div>
                          </div>
                          <div className={cx('cs-item-desc-price')}>
                            <div className={cx('cs-item-desc-price-sale')}>
                              <span className={cx('cs-unit')}>₫</span> <span className={cx('cs-price')}>{item?.configs[randomConfig]?.price}</span>
                            </div>
                            <div className={cx('cs-item-desc-price-origin')}>₫{item?.configs[randomConfig]?.price}</div>
                            <div className={cx('cs-item-desc-price-percent')}>
                              <div className={cx('cs-box-percent')}>
                                <span className={cx('cs-content-percent')}>-{item?.configs[randomConfig]?.discount}%</span>
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
                          Giảm&nbsp;{item?.configs[randomConfig]?.discount}%
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </span>
        </div>
      </div>
      {(totalPages > 0 && data?.pagination === true) && <ReactPaginateBlock handlePageClick={handlePageClick} totalPages={totalPages} />}

      {/* Modal */}
      <div>
        <div className={cx('modal fade', 'cs-cartModalProd')} id={`cartModalProd-${stt}`} tabIndex={-1} aria-labelledby={`cartModalProdLabel-${stt}`} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white py-3 d-flex justify-content-between align-items-center">
                <h1 className="modal-title fs-4 m-0" id={`cartModalProdLabel-${stt}`}>Số lượng</h1>
                <button ref={closeButtonRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body text-center">
                <div className="btn-group btn-group-lg" role="group" aria-label="Large button group">
                  <button type="button" className="btn btn-outline-secondary" onClick={handleDecreaseQuantity}>-</button>
                  <button disabled type="button" className="btn btn-outline-secondary text-dark">{quantity}</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={handleIncreaseQuantity}>+</button>
                </div>
                <h5 className="text-start mt-4">{productCurrent?.title}</h5>
                <span className="d-flex align-items-center mt-3 w-100">
                  <select className="form-select w-50" onChange={handleSelectConfig}>
                    {productCurrent?.configs && productCurrent?.configs.map((item, index) => (
                      <option key={item?.id} value={index}>
                        {item?.Color?.name}
                      </option>
                    ))}
                  </select>
                  <p className="w-50 mb-0 ms-4 text-start fs-5 fw-semibold text-primary">
                    {productCurrent?.configs && formatNumber((productCurrent?.configs[selectConfig].price || 0) * (1 - productCurrent?.configs[selectConfig].discount / 100) - 2000000)}đ
                  </p>
                </span>
              </div>
              <div className="modal-footer justify-content-between">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                <button type="button" className="btn btn-primary" onClick={handleAddProductToCartProd}>Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div >
  )
}

export default ProductItem
