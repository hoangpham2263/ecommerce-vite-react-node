import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import Rating from '@mui/material/Rating'
import Checkbox from '@mui/material/Checkbox'
import config from '../../../config'
import classNames from 'classnames/bind'
import styles from './HotSaleItem.module.scss'
import { addCart, readImage, readProduct } from '../../../services/publicApi'
import { useEffect, useRef, useState } from 'react'
import { LocalStorageGetInfo } from '../../../../main/components/LocalStorageMethod'
import useFetchAmountCart from '../../../hooks/useFetchAmountCart'
import { toast } from 'react-toastify'
import './HotSaleItem.css'
const cx = classNames.bind(styles)

const HotSaleItem = () => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [products, setProducts] = useState(null)
  const [product, setProduct] = useState()
  const [currentProductPage, setCurrentProductPage] = useState(1)
  const [totalProductPages, setTotalProductPages] = useState(0)

  // add cart
  const closeButtonRef = useRef(null)
  const LocalStorageGetInfos = LocalStorageGetInfo() || {}
  const [quantity, setQuantity] = useState(1)

  const fetchAmountCart = useFetchAmountCart()
  useEffect(() => { fetchAmountCart() }, [])

  const handleRemoveBackdrop = (item, e) => {
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
    e.preventDefault()
    const data = {
      UserId: LocalStorageGetInfos?.user?.id,
      ProductId: product?.id,
      quantity: quantity,
      total: product?.price * quantity
    }

    const fetchData = await addCart(data)
    if (fetchData?.data?.code === 0) {
      toast.success('Thêm vào giỏ hàng thành công')
      fetchAmountCart()
      closeButtonRef.current.click()
      setQuantity(1)
    }
  }
  // end add cart


  const limitPage = {
    product: 5
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
    <span>
      <div className={cx('row d-flex flex-wrap grid gap-5 justify-content-center pb-3')}>
        {products && products.map((item, index) => (
          <div key={index} className={cx('cs-list-item', 'p-0 col-2 bg-white text-decoration-none text-dark')}>
            <div className={cx('cs-item-block')}>
              <div className={cx('cs-card')}>
                <div className={cx('cs-item-pic')}>
                  <img className={cx('cs-item-pic-content')} src={item?.images[0]?.url || ''} alt='Product' />
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
