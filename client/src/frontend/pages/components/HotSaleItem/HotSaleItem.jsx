import classNames from 'classnames/bind'
import styles from './HotSaleItem.module.scss'
import './HotSaleItem.css'
import { useEffect, useRef, useState } from 'react'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import Rating from '@mui/material/Rating'
import Checkbox from '@mui/material/Checkbox'
import { toast } from 'react-toastify'
import config from '../../../config'
import { addCart, readProduct } from '../../../services/publicApi'
import useFetchAmountCart from '../../../hooks/useFetchAmountCart'
import { useAuth } from '../../../../main/context/AuthContext'
const cx = classNames.bind(styles)

const HotSaleItem = () => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [products, setProducts] = useState(null)
  const [product, setProduct] = useState()

  const closeButtonRef = useRef(null)
  const { user } = useAuth()
  const LocalStorageGetInfos = user
  const [quantity, setQuantity] = useState(1)
  const [selectConfig, setSelectConfig] = useState(0)


  const fetchAmountCart = useFetchAmountCart()
  useEffect(() => { fetchAmountCart() }, [])

  const handleRemoveBackdrop = (item) => {
    const modalBackdrops = document.querySelectorAll('.modal-backdrop.fade.show')
    modalBackdrops.forEach((backdrop) => { backdrop.style.display = 'none' })
    setProduct(item)
  }

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleAddProductToCart = async (e) => {
    const data = {
      UserId: LocalStorageGetInfos?.user?.id,
      ProductId: product?.id,
      quantity: quantity,
      config_id: product.configs && product.configs[Number(selectConfig)]?.id
    }
    const fetchData = await addCart(data)
    if (fetchData?.data?.code === 0) {
      toast.success('Thêm vào giỏ hàng thành công')
      fetchAmountCart()
      closeButtonRef.current.click()
      setQuantity(1)
      setSelectConfig(0)
    }
  }
  const handleSelectConfig = (event) => {
    setSelectConfig(event.target.value)
  }
  const handleFavoriteClick = (event) => {
    event.stopPropagation()
  }

  const fetchProductData = async () => {
    const data = { page: 1, limit: 5 }
    const fetchProducts = await readProduct(data)
    setProducts(fetchProducts?.data?.data?.product)
  }

  useEffect(() => {
    fetchProductData()
  }, [])

  const formatNumber = (number) => {
    return number.toLocaleString('vi-VN')
  }

  return (
    <span>
      <div className={cx('row d-flex flex-wrap grid gap-5 justify-content-center pb-3')}>
        {products && products.map((item, index) => (
          <div key={index} className={cx('cs-list-item', 'p-0 col-2 bg-white text-decoration-none text-dark')}>
            <div className={cx('cs-item-block')}>
              <div className={cx('cs-card')}>
                <div className={cx('cs-item-pic')}>
                  <img className={cx('cs-item-pic-content')} src={item?.configs[0]?.images[0]?.url || ''} alt='Product' />
                </div>
                <div className={cx('cs-card-body')}>
                  <button
                    type="button"
                    data-bs-toggle="modal" data-bs-target="#cartModalSale" onClick={() => handleRemoveBackdrop(item)}
                    className={cx('cs-custom-btn', 'codepro-custom-btn', 'codepro-btn-3', 'me-2', 'text-decoration-none text-white text-center')}
                  >
                    ADD TO CART
                  </button>
                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      window.location.href = config.routes.homeAdmin
                    }}
                    className={cx('cs-custom-btn', 'codepro-custom-btn', 'codepro-btn-3', 'text-decoration-none text-white text-center')}
                  >
                    QUICK VIEW
                  </button>
                </div>
              </div>

              <a className={cx('text-decoration-none text-dark', 'cs-item-desc')} href={`/${item?.slug}`} >
                <div className={cx('cs-item-desc-title')}>
                  <div className={cx('cs-item-desc-content')}>⚡️ Giá Sốc ⚡️ {item?.Brand?.name} {item?.Version?.name} {item?.Capacity?.name} {item?.configs[0]?.Color?.name}</div>
                </div>
                <div className={cx('cs-item-desc-voucher', 'd-flex')}>
                  <div className={cx('cs-voucher')}>Rẻ Vô Địch</div>
                  <div className={cx('cs-voucher')}>#ShopXuHuong</div>
                </div>
                <div className={cx('cs-item-desc-price')}>
                  <div className={cx('cs-item-desc-price-sale')}>
                    <span className={cx('cs-unit')}>₫</span> <span className={cx('cs-price')}>{item?.configs[0]?.price}</span>
                  </div>
                  <div className={cx('cs-item-desc-price-origin')}>₫{item?.configs[0]?.price}</div>
                  <div className={cx('cs-item-desc-price-percent')}>
                    <div className={cx('cs-box-percent')}>
                      <span className={cx('cs-content-percent')}>-{item?.configs[0]?.discount}%</span>
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
              <div className={cx('product__price--percent')}>
                <img className={cx('product__price--percent')} src='https://res.cloudinary.com/dqhj1sukr/image/upload/v1730468046/uploadLocal_ecommerce/azxoe0ipn6yl0hifhdhz.png' />
                <p className={cx('product__price--percent-detail')}>
                  Giảm&nbsp;{item?.configs[0]?.discount}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      <div>
        <div className="modal fade" id={cx('cartModalSale')} tabIndex={-1} aria-labelledby="cartModalSaleLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="cartModalSaleLabel">Số lượng</h1>
                <button ref={closeButtonRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body text-center">
                <div className="btn-group btn-group-lg" role="group" aria-label="Large button group">
                  <button type="button" className="btn btn-outline-secondary" onClick={handleDecreaseQuantity}>-</button>
                  <button disabled type="button" className="btn btn-outline-secondary text-dark">{quantity}</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={handleIncreaseQuantity}>+</button>
                </div>
                <h5 className='text-start mt-3'>{product?.title}</h5>
                <span className='d-flex align-items-center mt-2 w-100'>
                  <select className="form-select w-25" onChange={handleSelectConfig}>
                    {product?.configs && product?.configs.map((item, index) => (
                      <option key={item?.id} value={index} >
                        {item?.Color?.name}
                      </option>
                    ))}
                  </select>
                  <p className='w-50 mb-0 ms-3 text-start fs-5 fw-normal'>{product?.configs && formatNumber((product?.configs[selectConfig].price || 0) * (1 - product?.configs[selectConfig].discount / 100) - 2000000)}đ</p>
                </span>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                <button type="button" className="btn btn-primary" onClick={handleAddProductToCart}>Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
  )
}

export default HotSaleItem
