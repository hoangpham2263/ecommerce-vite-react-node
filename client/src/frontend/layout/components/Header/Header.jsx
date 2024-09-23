import './Header.css'
import { useState } from 'react'
import { CiLogin } from 'react-icons/ci'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { CgShoppingCart } from 'react-icons/cg'
import Search from '../Search'
import LoginBasic from '../LoginBasic'
import LogoSmall from '../../../components/Logo/LogoSmall'

const Header = () => {
  const [optionSocial, setOptionSocial] = useState('loginBasic')
  const handleSelectSocial = (option) => {
    setOptionSocial(option)
  }
  return (
    <header className='gl-bg-primary w-100'>
      <div className='w-100 gl-height-40 gl-bg-banner'>
        <div className='container gl-bg-transparent'>11111111111111111</div>
      </div>

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
              <a className='link-social-left' href='#' data-bs-toggle='modal' data-bs-target='#staticBackdrop'>Đăng nhập</a>
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-2 d-flex align-items-center'>
            <LogoSmall/>
          </div>
          <div className='col-8 d-flex align-items-center'>
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

        {/* <div className='row mb-1'>
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
        </div> */}
      </div>
      {/* <!-- Modal --> */}
      <div className='modal fade' id='staticBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollablemodal-dialog'>
          <div className='modal-content'>
            {optionSocial === 'loginBasic' && <LoginBasic/>}
            {optionSocial === 'facebook' && null}
            {optionSocial === 'google' && null}
            <div className='footer-custom'>
              <div className='line'>
                <div className='text-in-line'>Other Login Methods</div>
              </div>
              <div className='social'>
                <button type='button' className='btn-social google' onClick={() => handleSelectSocial('loginBasic')}><CiLogin className='google-icon' /></button>
                <button type='button' className='btn-social facebook' onClick={() => handleSelectSocial('facebook')}><FaFacebook className='facebook-icon' /></button>
                <button type='button' className='btn-social google' onClick={() => handleSelectSocial('google')}><FcGoogle className='google-icon' /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
