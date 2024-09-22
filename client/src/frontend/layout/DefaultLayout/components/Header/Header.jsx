import './Header.css'
import Search from '../Search'
import { CgShoppingCart } from 'react-icons/cg'
import LogoSmall from '../../../../components/Logo/LogoSmall'

const Header = () => {
  return (
    <header className='gl-bg-primary w-100'>
      <div className='container gl-bg-transparent py-1'>
        <div className='row mt-2'>
          <div className='col-6'>
            <div className='d-flex align-items-center'>
              <a className='link-social-left' href='#'>Kênh người bán</a>
              <span className='wall-center-link'></span>
              <a className='link-social-left' href='#'>trở thành người bán hàng E-Shop</a>
              <span className='wall-center-link'></span>
              <a className='link-social-left' href='#'>Tải ứng dụng</a>
              <span className='wall-center-link'></span>
              <a className='link-social-left' href='#'>Kết Nối</a>
            </div>
          </div>
          <div className='col-6'>
            <div className='d-flex align-items-center justify-content-end'>
              <a className='link-social-right' href='#'>Thông báo</a>
              <a className='link-social-right' href='#'>Hỗ trợ</a>
              <a className='link-social-right' href='#'>Tiếng việt</a>
              <a className='link-social-right' href='#'>Đăng Ký</a>
              <span className='wall-center-link'></span>
              <a className='link-social-left' href='#'>Đăng nhập</a>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-2'>
            <LogoSmall/>
          </div>
          <div className='col-8'>
            <Search/>
          </div>
          <div className='col-2 d-flex justify-content-center align-items-center'>
            <button type="button" className="btn btn-primary position-relative">
              <CgShoppingCart className='icon-cart'/>
              <span className="position-absolute translate-middle badge rounded-pill bg-danger cs-badges">
                99+
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </div>
        </div>
        <div className='row mb-1'>
          <div className='col-2'></div>
          <div className='col-8'>
            <div className='d-flex align-items-center'>
              <a className='link-categories' href='#'>Categories Item</a>
              <a className='link-categories' href='#'>Categories Item</a>
              <a className='link-categories' href='#'>Categories Item</a>
              <a className='link-categories' href='#'>Categories Item</a>
              <a className='link-categories' href='#'>Categories Item</a>
            </div>
          </div>
          <div className='col-2'></div>
        </div>
      </div>
    </header>
  )
}

export default Header
