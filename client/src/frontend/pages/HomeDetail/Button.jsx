import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'
import { MdAddShoppingCart } from 'react-icons/md'
import { addCart } from '../../services/publicApi'
import { LocalStorageGetInfo } from '../../../main/components/LocalStorageMethod'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import useFetchAmountCart from '../../hooks/useFetchAmountCart'

const cx = classNames.bind(styles)

const Button = ({ product, selectConfig }) => {
  const closeButtonRef = useRef(null)
  const LocalStorageGetInfos = LocalStorageGetInfo() || {}
  const [quantity, setQuantity] = useState(1)

  const fetchAmountCart = useFetchAmountCart()
  useEffect(() => { fetchAmountCart() }, [])

  const handleRemoveBackdrop = () => {
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

  // ---------- button add to cart ----------
  const handleAddProductToCart = async (e) => {
    e.preventDefault()
    const data = {
      UserId: LocalStorageGetInfos?.user?.id,
      ProductId: product?.id,
      quantity: quantity,
      select_config: selectConfig
    }
    const fetchData = await addCart(data)
    if (fetchData?.data?.code === 0) {
      toast.success('Thêm vào giỏ hàng thành công')
      fetchAmountCart()
      closeButtonRef.current.click()
    }
  }
  const formatNumber = (number) => {
    return number.toLocaleString('vi-VN')
  }


  return (
    <div className={cx('row')}>
      <div className={cx('col-md-10', 'pe-1', 'mb-2')}>
        <button type="button" className={cx('btn btn-danger w-100', 'cs-hight-60')}>
          <p className={cx('m-0', 'cs-btn-size-16')}>MUA NGAY</p>
          <p className={cx('m-0', 'cs-btn-size-14')}>(Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)</p>
        </button>
      </div>
      <div className={cx('col-md-2', 'ps-1', 'mb-2')}>
        <button type="button" className={cx('btn btn-danger w-100', 'cs-hight-60', 'cs-btn-cart')} data-bs-toggle="modal" data-bs-target="#cartModal" onClick={handleRemoveBackdrop}>
          <MdAddShoppingCart className={cx('cs-icon-cart')} />
          <p className={cx('m-0', 'cs-btn-text-cart')}>Thêm vào giỏ</p>
        </button>
      </div>
      <div className={cx('col-md-6', 'pe-1', 'mb-2')}>
        <button type="button" className={cx('btn btn-primary w-100', 'cs-hight-60')}>
          <p className={cx('m-0', 'cs-btn-size-14')}>TRẢ GÓP 0%</p>
          <p className={cx('m-0', 'cs-btn-size-12')}>Trả trước chỉ từ 0đ</p>
        </button>
      </div>
      <div className={cx('col-md-6', 'ps-1', 'mb-2')}>
        <button type="button" className={cx('btn btn-primary w-100', 'cs-hight-60')}>
          <p className={cx('m-0', 'cs-btn-size-14')}>TRẢ GÓP 0% QUA THẺ</p>
          <p className={cx('m-0', 'cs-btn-size-12')}>(Không phí chuyển đổi 3 - 6 tháng)</p>
        </button>
      </div>
      <div className={cx('col-md-12', 'mb-3')}>
        <button type="button" className={cx('btn btn-warning w-100', 'cs-hight-60', 'cs-btn-warning')}>
          <p className={cx('m-0', 'cs-btn-size-14')}>Thu cũ lên đời</p>
          <p className={cx('m-0', 'cs-btn-size-12')}>Chỉ từ {product?.configs && formatNumber((product.configs[selectConfig]?.price || 0) * (1 - product.configs[selectConfig]?.discount / 100) - 2000000)}đ</p>
        </button>
      </div>

      {/* Modal */}
      <div>
        <div className="modal fade" id="cartModal" tabIndex={-1} aria-labelledby="cartModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="cartModalLabel">Số lượng</h1>
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

    </div>
  )
}

export default Button
