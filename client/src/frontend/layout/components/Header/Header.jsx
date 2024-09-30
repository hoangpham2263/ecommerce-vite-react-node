import { Link } from 'react-router-dom'
import { CiLocationOn } from 'react-icons/ci'
import { IoIosArrowDown } from 'react-icons/io'
import { PiPhoneCallThin, PiUserCircleThin } from 'react-icons/pi'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import './Header.css'
import Search from '../Search'
import LogoSmall from '../../../components/Logo/LogoSmall'
import config from '../../../config'
import BannerTopHead from '../BannerTopHead/BannerTopHead'
import { CgLoadbarDoc } from 'react-icons/cg'
import UserInfoLogin from './UserInfoLogin'


const Header = () => {
  return (
    <header className='gl-bg-primary w-100'>
      <BannerTopHead />
      <div className='container gl-bg-transparent cs-header'>
        <div className='me-2'><LogoSmall /></div>
        <div className='cs-nav-item cs-nav-item-bg'><CgLoadbarDoc className='cs-nav-item-icon' />Danh Mục</div>
        <div className='cs-nav-item cs-nav-item-bg'><CiLocationOn className='cs-nav-item-icon' />
          <div className='d-flex flex-column'>
            <p className='gl-fz-10 m-0 d-flex justify-content-between'>Xem giá tại <IoIosArrowDown className='gl-fz-1 ms-1' /></p>
            <p className='gl-fz-14 m-0'>Hồ Chí Minh</p>
          </div>
        </div>
        <div className='me-2'><Search /></div>
        <div className='cs-nav-item'><PiPhoneCallThin className='cs-nav-item-icon' />
          <div className='d-flex flex-column'>
            <p className='gl-fz-12 m-0 d-flex justify-content-between'>Gọi mua hàng</p>
            <p className='gl-fz-10 m-0'>0971955144</p>
          </div>
        </div>
        <div className='cs-nav-item'><CiLocationOn className='cs-nav-item-icon' />
          <div className='d-flex flex-column'>
            <p className='gl-fz-11 m-0 d-flex justify-content-between'>Cửa hàng</p>
            <p className='gl-fz-11 m-0'>gần bạn</p>
          </div>
        </div>
        <div className='cs-nav-item'><LiaShippingFastSolid className='cs-nav-item-icon' />
          <div className='d-flex flex-column'>
            <p className='gl-fz-11 m-0 d-flex justify-content-between'>Tra cứu</p>
            <p className='gl-fz-11 m-0'>đơn hàng</p>
          </div>
        </div>
        <div className='cs-nav-item'><HiOutlineShoppingBag className='cs-nav-item-icon' />
          <div className='d-flex flex-column'>
            <p className='gl-fz-11 m-0 d-flex justify-content-between'>Giỏ</p>
            <p className='gl-fz-11 m-0'>hàng</p>
          </div>
        </div>
        <UserInfoLogin />
      </div>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header pt-1 pb-0 x-1">
              <h1 className="modal-title w-100 fs-2 gl-color-primary d-flex justify-content-center border-0 mt-2" id="staticBackdropLabel">Smember</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body border-0 pt-1 pb-2 px-1">
              <div className='w-100 d-flex justify-content-center pb-2'>
                <img className='' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:0:80/q:90/plain/https://cellphones.com.vn/media/wysiwyg/chibi2.png' />
              </div>
              <h4 className="w-100 d-flex justify-content-center gl-fz-14 text-center px-2" id="staticBackdropLabel">Vui lòng đăng nhập tài khoản Smember để xem ưu đãi và thanh toán dễ dàng hơn.</h4>
            </div>
            <div className="modal-footer border-0 d-flex justify-content-around">
              <a href={config.routes.register} className="btn cs-btn-register">Đăng ký</a>
              <a href={config.routes.login} className="btn cs-btn-login">Đăng Nhập</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
