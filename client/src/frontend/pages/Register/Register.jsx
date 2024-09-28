import { useState } from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { BiShow, BiHide } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'

import './Register.css'
import classNames from 'classnames/bind'
import styles from './Register.module.scss'
import config from '../../config'
import LoginWithGoogle from '../components/LoginWithGoogle'
import { registerAccountBasic } from '../../../main/services/sharedApi'


const cx = classNames.bind(styles)

const Register = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState([false])
  const [showConfirmPassword, setShowConfirmPassword] = useState([false])
  const [data, setData] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => { return { ...prev, [name]: value } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let response = await registerAccountBasic(data)
    if (response?.data?.code === 0) {
      toast.success(response?.data?.message)
      navigate(config.routes.login)
    } else {
      toast.error(response?.data?.message)
    }
  }
  return (
    <div className={cx('wrapper', 'py-5')}>
      <div className={cx('logo')}><svg width="100%" height="calc(100vh - 175px)" viewBox="0 0 405 809" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-358.39 358.707L-293.914 294.23L-293.846 294.163H-172.545L-220.81 342.428L-233.272 354.889L-282.697 404.314L-276.575 410.453L0.316589 687.328L283.33 404.314L233.888 354.889L230.407 351.391L173.178 294.163H294.48L294.547 294.23L345.082 344.765L404.631 404.314L0.316589 808.629L-403.998 404.314L-358.39 358.707ZM0.316589 0L233.938 233.622H112.637L0.316589 121.301L-112.004 233.622H-233.305L0.316589 0Z" fill="#69b1ff"></path><path d="M-516.39 358.707L-451.914 294.23L-451.846 294.163H-330.545L-378.81 342.428L-391.272 354.889L-440.697 404.314L-434.575 410.453L-157.683 687.328L125.33 404.314L75.8879 354.889L72.4068 351.391L15.1785 294.163H136.48L136.547 294.23L187.082 344.765L246.631 404.314L-157.683 808.629L-561.998 404.314L-516.39 358.707ZM-157.683 0L75.9383 233.622H-45.3627L-157.683 121.301L-270.004 233.622H-391.305L-157.683 0Z" fill="#95de64" opacity="0.6"></path><path d="M-647.386 358.707L-582.91 294.23L-582.842 294.163H-461.541L-509.806 342.428L-522.268 354.889L-571.693 404.314L-565.571 410.453L-288.68 687.328L-5.66624 404.314L-55.1082 354.889L-58.5893 351.391L-115.818 294.163H5.48342L5.5507 294.23L56.0858 344.765L115.635 404.314L-288.68 808.629L-692.994 404.314L-647.386 358.707ZM-288.68 0L-55.0578 233.622H-176.359L-288.68 121.301L-401 233.622H-522.301L-288.68 0Z" fill="#fff1f0" opacity="1"></path></svg></div>
      <form className={cx('row', 'form-block', 'p-5')}>
        <div className='d-flex justify-content-between'>
          <h4 className='fw-semibold'>Register</h4>
          <p><Link className="link-offset-2 link-underline link-underline-opacity-0 size-14" to={`${config.routes.login}`}>Already have an account?</Link></p>
        </div>
        <div className="mb-3 pt-2">
          <label htmlFor="fullName" className="form-label mb-1 fw-light size-14">Full Name</label>
          <input type="text" className="form-control" name='fullName' id="fullName" required onChange={handleOnChange} />
        </div>
        <div className="mb-3 pt-2">
          <label htmlFor="userName" className="form-label mb-1 fw-light size-14">userName</label>
          <input type="text" className="form-control" name='userName' id="userName" required onChange={handleOnChange} />
        </div>
        <div className="mb-3 pt-2 cs-block-show-hide">
          <label htmlFor="password" className="form-label mb-1 fw-light size-14">Password</label>
          <input type={showPassword ? 'password' : 'text'} className="form-control" name='password' id="password" required onChange={handleOnChange} />
          {true && (
            <div className={cx('cs-show-hide')} onClick={handleShowPassword}>
              {showPassword ? <BiHide /> : <BiShow />}
            </div>
          )}
        </div>
        <div className="mb-3 pt-2 cs-block-show-hide">
          <label htmlFor="confirmPassword" className="form-label mb-1 fw-light size-14">Confirm Password</label>
          <input type={showConfirmPassword ? 'password' : 'text'} className="form-control" name='confirmPassword' id="confirmPassword" required onChange={handleOnChange} />
          {true && (
            <div className={cx('cs-show-hide')} onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <BiHide /> : <BiShow />}
            </div>
          )}
        </div>
        <div className='col-md-12 position-relative'>
          <label htmlFor='validationServer01' className='form-label fw-normal'>Gender</label>
          <div className='d-flex gap-4 justify-content-between'>
            <label className='form-check btn-custom' htmlFor='gender1'>
              <input className='form-check-input ms-0 me-3' type='radio' name='gender' id='gender1' value='female' onChange={handleOnChange} />
              <span className='form-check-label dark'>Female</span>
            </label>
            <label className='form-check btn-custom' htmlFor='gender2'>
              <input className='form-check-input ms-0 me-3' type='radio' name='gender' id='gender2' value='male' onChange={handleOnChange} />
              <span className='form-check-label'>Male</span>
            </label>
            <label className='form-check btn-custom' htmlFor='gender3'>
              <input className='form-check-input ms-0 me-3' type='radio' name='gender' id='gender3' value='other' onChange={handleOnChange} />
              <span className='form-check-label'>Other</span>
            </label>
          </div>
          <div className='valid-feedback'>Looks good!</div>
        </div>
        <div className=''>
          <p className={cx('text-12', 'mt-2', 'mb-0')}>By Signing up, you agree to our  <Link className='link-underline link-underline-opacity-0'>Terms of Service</Link>  and  <Link className='link-underline link-underline-opacity-0'>Privacy Policy</Link></p>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-4" onClick={handleSubmit}>Create Account</button>
        <div className="d-flex align-items-center pt-4">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-line">Login with</span>
          <hr className="flex-grow-1" />
        </div>
        <div className='d-flex justify-content-between py-4'>
          <LoginWithGoogle />
          <button type="button" className="d-flex align-items-center btn btn-outline-secondary custom-hover">
            <FaFacebookF className='text-primary' /><span className='mx-1'>{''}</span><span className='size-14'>Facebook</span>
          </button>
          <button type="button" className="d-flex align-items-center btn btn-outline-secondary custom-hover">
            <FaTwitter className='text-info' /><span className='mx-1'>{''}</span><span className='size-14'>Twitter</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register