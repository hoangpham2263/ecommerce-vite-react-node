import {Link} from 'react-router-dom'
import { CgShoppingCart } from 'react-icons/cg'

import './Header.css'
import Search from '../Search'
import LogoSmall from '../../../components/Logo/LogoSmall'
import config from '../../../config'

const Header = () => {
  return (
    <header className='gl-bg-primary w-100'>
      <div className='w-100 gl-height-40 gl-bg-banner'>
        <div className='container gl-bg-transparent'>11111111111111111</div>
      </div>

      <div className='container gl-bg-transparent py-1'>
        <div className='row mt-2'>
          <div className='col-6'>
            <div className='d-flex align-items-center'>
              <Link className='link-social-left' to='#'>Kênh người bán</Link>
              <span className='wall-center-link'></span>
              <Link className='link-social-left' to='#'>trở thành người bán hàng E-Shop</Link>
              <span className='wall-center-link'></span>
              <Link className='link-social-left' to='#'>Tải ứng dụng</Link>
              <span className='wall-center-link'></span>
              <Link className='link-social-left' to='#'>Kết Nối</Link>
            </div>
          </div>
          <div className='col-6'>
            <div className='d-flex align-items-center justify-content-end'>
              <Link className='link-social-right' to='#'>Thông báo</Link>
              <Link className='link-social-right' to='#'>Hỗ trợ</Link>
              <Link className='link-social-right' to='#'>Tiếng việt</Link>
              <Link className='link-social-right' to={`${config.routes.register}`} >Đăng ký</Link>
              <span className='wall-center-link'></span>
              <Link className='link-social-left' to={`${config.routes.login}`} >Đăng nhập</Link>
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-2 d-flex align-items-center'><LogoSmall/></div>
          <div className='col-8 d-flex align-items-center'><Search/></div>
          <div className='col-2 d-flex justify-content-center align-items-center'>
            <button type="button" className="btn btn-primary position-relative">
              <CgShoppingCart className='icon-cart'/>
              <span className="position-absolute translate-middle badge rounded-pill bg-danger cs-badges">99+<span className="visually-hidden">unread messages</span></span>
            </button>
          </div>
        </div>

        {/* <div className='row mb-1'>
          <div className='col-2'></div>
          <div className='col-8'>
            <div className='d-flex align-items-center'>
              <Link className='link-categories' to='#'>Categories Item</Link>
              <Link className='link-categories' to='#'>Categories Item</Link>
              <Link className='link-categories' to='#'>Categories Item</Link>
              <Link className='link-categories' to='#'>Categories Item</Link>
              <Link className='link-categories' to='#'>Categories Item</Link>
            </div>
          </div>
          <div className='col-2'></div>
        </div> */}
      </div>
    </header>
  )
}

export default Header
