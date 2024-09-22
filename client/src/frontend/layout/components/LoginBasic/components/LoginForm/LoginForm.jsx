import { Fragment, useState } from 'react'
import './LoginForm.css'

const LoginForm = () => {

  const [data, setData] = useState({ valueLogin:'', password:'' })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Fragment>
      <div className='modal-header px-3'>
        <h2 className="modal-title fw-bold">Login</h2>
        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
      </div>
      <div className='modal-body px-3'>
        <form className='row g-3 needs-validation' noValidate={false}>
          <div className='col-md-12 position-relative'>
            <input type='text' className='form-control' id='validationTooltip03' placeholder='Mobile number or email address' required name='valueLogin' onChange={handleOnChange}/>
            <div className='invalid-tooltip'>Please provide email or phone.</div>
          </div>
          <div className='col-md-12 position-relative'>
            <input type='text' className='form-control' id='validationTooltip04' placeholder='Password' required name='password' onChange={handleOnChange}/>
            <div className='invalid-tooltip'>Please enter password.</div>
          </div>
          <span className='col-md-12 form-label fw-normal text-footer mb-1'>People who use our service may have uploaded your contact information to QHDev. Learn more.</span>
          <span className='col-md-12 form-label fw-normal text-footer my-2'>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</span>
          <div className='col-12 d-flex justify-content-center'>
            <button className='btn btn-primary px-5' onClick={handleSubmit} type='submit'>Sign Up</button>
          </div>
        </form>
      </div>
    </Fragment>
  )
}

export default LoginForm