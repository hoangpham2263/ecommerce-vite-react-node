
import { Fragment, useState } from 'react'
import './SignUpForm.css'

const SignUpForm = () => {

  const [data, setData] = useState({ firstName: '', lastName: '', email:'', mobile:'', password:'', confirmPassword:'', gender:'' })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = (e) => {
    // e.preventDefault()
  }

  return (
    <Fragment>
      <div className='modal-header px-3'>
        <h2 className="modal-title fw-bold">Sign Up</h2>
        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
      </div>
      <div className='modal-body px-3'>
        <form className='row g-3 needs-validation' noValidate={false}>
          <div className='col-md-6 position-relative'>
            <input type='text' className='form-control' placeholder='First name' required name='firstName' onChange={handleOnChange} />
          </div>
          <div className='col-md-6 position-relative'>
            <input type='text' className='form-control' placeholder='Last name' required name='lastName' onChange={handleOnChange} />
          </div>
          <div className='col-md-12 position-relative'>
            <input type='text' className='form-control' placeholder='Email address' required name='gmail' onChange={handleOnChange} />
          </div>
          <div className='col-md-12 position-relative'>
            <input type='text' className='form-control' placeholder='Mobile number' required name='mobile' onChange={handleOnChange} />
          </div>
          <div className='col-md-12 position-relative'>
            <input type='text' className='form-control' placeholder='Password' required name='password' onChange={handleOnChange} />
          </div>
          <div className='col-md-12 position-relative'>
            <input type='text' className='form-control' placeholder='Confirm password' required name='confirmPassword' onChange={handleOnChange} />
          </div>
          <div className='col-md-12 position-relative'>
            <label className='form-label fw-normal'>Gender</label>
            <div className='d-flex gap-4 justify-content-between'>
              <label className='form-check btn-custom' htmlFor='flexRadioDefault1'>
                <input className='form-check-input ms-0 me-3' type='radio' id='flexRadioDefault1' required name='gender' onChange={handleOnChange} />
                <span className='form-check-label dark'>Female</span>
              </label>
              <label className='form-check btn-custom' htmlFor='flexRadioDefault2'>
                <input className='form-check-input ms-0 me-3' type='radio' id='flexRadioDefault2' required name='gender' onChange={handleOnChange} />
                <span className='form-check-label'>Male</span>
              </label>
              <label className='form-check btn-custom' htmlFor='flexRadioDefault3'>
                <input className='form-check-input ms-0 me-3' type='radio' id='flexRadioDefault3' required name='gender' onChange={handleOnChange} />
                <span className='form-check-label'>Custom</span>
              </label>
            </div>
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

export default SignUpForm