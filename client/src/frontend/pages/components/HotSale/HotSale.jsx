import './HotSale.css'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import Rating from '@mui/material/Rating'
import Checkbox from '@mui/material/Checkbox'
import { Link, useNavigate } from 'react-router-dom'

const Carousel = () => {
  const listItem = [1, 2, 3, 4, 5]
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const navigate = useNavigate()

  const handleFavoriteClick = (event) => {
    event.stopPropagation()
  }

  const handleAddToCart = (event) => {
    event.stopPropagation()
    navigate('/cart') // Thay đổi đường dẫn đến giỏ hàng
  }

  const handleSeeDetail = (event) => {
    event.stopPropagation()
    navigate('/detail') // Thay đổi đường dẫn đến chi tiết sản phẩm
  }

  return (
    <div className='container'>
      <div className='cs-hot-sale-bg p-2'>
        <div className='row d-flex align-items-center justify-content-between mt-2'>
          <div className='col-4'>
            <img className='cs-hot-sale-img' src='https://cdn2.cellphones.com.vn/x/media/catalog/product/h/o/hot-sale-cuoi-tuan-20-03-2024.gif' alt='Hot Sale Banner' />
          </div>
          <div className='col-3 d-flex justify-content-end me-3'>
            <div className='cs-btn-hot-sale gl-bg-white me-3'>Điện thoại, Tablet</div>
            <div className='cs-btn-hot-sale'>Phụ kiện, TV</div>
          </div>
        </div>
        <div className='row'>
          <div className='cs-hot-sale-time'>
            Kết thúc sau: <span className='cs-circle-time'>02</span> : <span className='cs-circle-time'>04</span> : <span className='cs-circle-time'>55</span> : <span className='cs-circle-time'>15</span>
          </div>
        </div>
        <div className='row'>
          <div className='main-contain'>
            {listItem.map((item, index) => (
              <div key={index} className='cs-list-item p-0'>
                <div className='cs-item-block'>
                  <div className='cs-card'>
                    <div className='cs-item-pic'>
                      <img className='cs-item-pic-content' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-1.png' alt='Product' />
                    </div>
                    <div className='cs-card-body'>
                      <button className='cs-custom-btn codepro-custom-btn codepro-btn-3 me-2' onClick={handleAddToCart}>
                        <span>ADD TO CART</span>
                      </button>
                      <button className='cs-custom-btn codepro-custom-btn codepro-btn-3' onClick={handleSeeDetail}>
                        <span>SEE DETAIL</span>
                      </button>
                    </div>
                  </div>
                  <div className='cs-item-desc'>
                    <div className='cs-item-desc-title'>
                      <div className='cs-item-desc-content'>⚡️ Giá Sốc ⚡️Thắt lưng nam da cao cấp khóa kim loại tự động không gỉ - Cam kết 1 đổi 1 bảo hành 12 tháng</div>
                    </div>
                    <div className='cs-item-desc-voucher d-flex'>
                      <div className='cs-voucher'>Rẻ Vô Địch</div>
                      <div className='cs-voucher'>#ShopXuHuong</div>
                    </div>
                    <div className='cs-item-desc-price'>
                      <div className='cs-item-desc-price-sale'>
                        <span className='cs-unit'>₫</span> <span className='cs-price'>1.000</span>
                      </div>
                      <div className='cs-item-desc-price-origin'>₫10.000</div>
                      <div className='cs-item-desc-price-percent'>
                        <div className='cs-box-percent'>
                          <span className='cs-content-percent'>-90%</span>
                        </div>
                      </div>
                    </div>
                    <div className='cs-item-rating d-flex align-items-center'>
                      <div className='cs-item-rating-start me-2'>
                        <Rating name="size-small" value={4} size="small" readOnly />
                      </div>
                      <div className='cs-item-sell'>Đã bán 366,2k</div>
                    </div>
                    <div className='cs-item-located d-flex align-items-center justify-content-between'>
                      <div className='cs-destination'>TP. Hồ Chí Minh</div>
                      <div>
                        <Checkbox {...label} onClick={handleFavoriteClick} icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel
