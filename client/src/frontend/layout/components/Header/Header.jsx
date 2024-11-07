import { CiLocationOn } from 'react-icons/ci'
import { IoIosArrowDown } from 'react-icons/io'
import { PiPhoneCallThin, PiUserCircleThin } from 'react-icons/pi'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import Search from '../Search'
import LogoSmall from '../../../components/Logo/LogoSmall'
import config from '../../../config'
import BannerTopHead from '../BannerTopHead/BannerTopHead'
import { CgLoadbarDoc } from 'react-icons/cg'
import UserInfoLogin from './UserInfoLogin'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import './Header.css'

const cx = classNames.bind(styles)

const Header = () => {
  return (
    <header className={cx('gl-bg-primary', 'w-100', 'wrapper')}>
      <BannerTopHead />
      <div className={cx('container', 'gl-bg-transparent', 'cs-header')}>
        <div className={cx('me-2')}><LogoSmall /></div>
        <div className={cx('cs-nav-item', 'cs-nav-item-bg')}><CgLoadbarDoc className={cx('cs-nav-item-icon')} />Danh Mục</div>
        <div className={cx('cs-nav-item', 'cs-nav-item-bg')}><CiLocationOn className={cx('cs-nav-item-icon')} />
          <div className={cx('d-flex', 'flex-column')}>
            <p className={cx('gl-fz-10', 'm-0', 'd-flex', 'justify-content-between')}>Xem giá tại <IoIosArrowDown className={cx('gl-fz-1', 'ms-1')} /></p>
            <p className={cx('gl-fz-14', 'm-0')}>Hồ Chí Minh</p>
          </div>
        </div>
        <div className={cx('me-2')}><Search /></div>
        <div className={cx('cs-nav-item')}><PiPhoneCallThin className={cx('cs-nav-item-icon')} />
          <div className={cx('d-flex', 'flex-column')}>
            <p className={cx('gl-fz-12', 'm-0', 'd-flex', 'justify-content-between')}>Gọi mua hàng</p>
            <p className={cx('gl-fz-10', 'm-0')}>0971955144</p>
          </div>
        </div>
        <div className={cx('cs-nav-item')}><CiLocationOn className={cx('cs-nav-item-icon')} />
          <div className={cx('d-flex', 'flex-column')}>
            <p className={cx('gl-fz-11', 'm-0', 'd-flex', 'justify-content-between')}>Cửa hàng</p>
            <p className={cx('gl-fz-11', 'm-0')}>gần bạn</p>
          </div>
        </div>
        <div className={cx('cs-nav-item')}><LiaShippingFastSolid className={cx('cs-nav-item-icon')} />
          <div className={cx('d-flex', 'flex-column')}>
            <p className={cx('gl-fz-11', 'm-0', 'd-flex', 'justify-content-between')}>Tra cứu</p>
            <p className={cx('gl-fz-11', 'm-0')}>đơn hàng</p>
          </div>
        </div>
        <div onClick={() => window.location.href = config.routes.cart} className={cx('cs-nav-item')}><HiOutlineShoppingBag className={cx('cs-nav-item-icon')} />
          <div className={cx('d-flex', 'flex-column')}>
            <p className={cx('gl-fz-11', 'm-0', 'd-flex', 'justify-content-between')}>Giỏ</p>
            <p className={cx('gl-fz-11', 'm-0')}>hàng</p>
          </div>
        </div>
        <UserInfoLogin />
      </div>
      <div className={cx('modal', 'fade')} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className={cx('modal-dialog', 'modal-dialog-centered', 'modal-sm')}>
          <div className={cx('modal-content')}>
            <div className={cx('modal-header', 'pt-1', 'pb-0', 'x-1')}>
              <h1 className={cx('modal-title', 'w-100', 'fs-2', 'gl-color-primary', 'd-flex', 'justify-content-center', 'border-0', 'mt-2')} id="staticBackdropLabel">Smember</h1>
              <button type="button" className={cx('btn-close')} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className={cx('modal-body', 'border-0', 'pt-1', 'pb-2', 'px-1')}>
              <div className={cx('w-100', 'd-flex', 'justify-content-center', 'pb-2')}>
                <img className='' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:0:80/q:90/plain/https://cellphones.com.vn/media/wysiwyg/chibi2.png' />
              </div>
              <h4 className={cx('w-100', 'd-flex', 'justify-content-center', 'gl-fz-14', 'text-center', 'px-2')} id="staticBackdropLabel">Vui lòng đăng nhập tài khoản Smember để xem ưu đãi và thanh toán dễ dàng hơn.</h4>
            </div>
            <div className={cx('modal-footer', 'border-0', 'd-flex', 'justify-content-around')}>
              <a href={config.routes.register} className={cx('btn', 'cs-btn-register')}>Đăng ký</a>
              <a href={config.routes.login} className={cx('btn', 'cs-btn-login')}>Đăng Nhập</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
