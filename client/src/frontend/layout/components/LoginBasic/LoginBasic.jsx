import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

import './LoginBasic.css'
import LoginForm from './components/LoginForm/LoginForm'
import SignUpForm from './components/SignUpForm/SignUpForm'

const LoginBasic = () => {
  const [optionLoginRegis, setOptionLoginRegis] = useState('loginBasic')

  const handleClickLoginRegis = (option) => {
    setOptionLoginRegis(option)
  }

  return (
    <Fragment>
      {optionLoginRegis === 'loginBasic'?(<>
        <LoginForm />
        <Link className='d-flex justify-content-center col-md-12 form-label fw-normal text-footer' onClick={() => handleClickLoginRegis('signUpBasic')}>You do not have an account</Link>
      </>
      ):(<>
        <SignUpForm/>
        <Link className='d-flex justify-content-center col-md-12 form-label fw-normal text-footer' onClick={() => handleClickLoginRegis('loginBasic')}>You already have an account</Link>
      </>)}
    </Fragment>
  )
}

export default LoginBasic
