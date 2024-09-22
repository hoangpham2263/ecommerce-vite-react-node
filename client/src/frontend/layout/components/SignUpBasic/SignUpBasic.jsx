import { Fragment } from 'react'
import './SignUpBasic.css'

const SignUpBasic = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <Fragment>
      <div className='modal-header px-3'>
        <h2 className="modal-title fw-bold">Sign Up</h2>
        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'/>
      </div>
      <div className='modal-body px-3'>
        <form className='row g-3 needs-validation' noValidate={true}>
          <div className='col-md-6 position-relative'>
            <input type='text' className='form-control' id='validationTooltip01' placeholder='First name' required />
            <div className='valid-tooltip'>Looks good!</div>
          </div>
          <div className='col-md-6 position-relative'>
            <input type='text' className='form-control' id='validationTooltip02' placeholder='Last name' required />
            <div className='valid-tooltip'>Looks good!</div>
          </div>
          <div className='col-md-12 position-relative'>
            <input type='text' className='form-control' id='validationTooltip03' placeholder='Mobile number or email address' required />
            <div className='invalid-tooltip'>Please provide email or phone.</div>
          </div>
          <div className='col-md-12 position-relative'>
            <input type='text' className='form-control' id='validationTooltip04' placeholder='Password' required />
            <div className='invalid-tooltip'>Please enter password.</div>
          </div>
          <div className='col-md-12 position-relative'>
            <label htmlFor='validationServer01' className='form-label fw-normal'>Gender</label>
            <div className='d-flex gap-4 justify-content-between'>
              <label className='form-check btn-custom' htmlFor='flexRadioDefault1'>
                <input className='form-check-input ms-0 me-3' type='radio' name='flexRadioDefault' id='flexRadioDefault1' />
                <span className='form-check-label dark'>Female</span>
              </label>
              <label className='form-check btn-custom' htmlFor='flexRadioDefault2'>
                <input className='form-check-input ms-0 me-3' type='radio' name='flexRadioDefault' id='flexRadioDefault2' />
                <span className='form-check-label'>Male</span>
              </label>
              <label className='form-check btn-custom' htmlFor='flexRadioDefault3'>
                <input className='form-check-input ms-0 me-3' type='radio' name='flexRadioDefault' id='flexRadioDefault3' />
                <span className='form-check-label'>Custom</span>
              </label>
            </div>
            <div className='valid-feedback'>Looks good!</div>
          </div>
          <span htmlFor='validationServer01' className='col-md-12 form-label fw-normal text-footer mb-1'>People who use our service may have uploaded your contact information to QHDev. Learn more.</span>
          <span htmlFor='validationServer01' className='col-md-12 form-label fw-normal text-footer my-2'>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</span>
          <div className='col-12 d-flex justify-content-center'>
            <button className='btn btn-primary px-5' onClick={handleSubmit} type='submit'>Sign Up</button>
          </div>
        </form>
      </div>
    </Fragment>
  )
}

export default SignUpBasic
