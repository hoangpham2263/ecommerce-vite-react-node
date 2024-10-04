import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

import { confirmGetToken, getInfoAccountUseAccessToke, readProfileJWT, saveAccountToServer } from '../services/sharedApi'
import config from '../../admin/config'

const LoginWithGoogle = () => {
  const navigate = useNavigate()

  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (response) => {
      try {
        const tokenResponse = await confirmGetToken(response)

        const accessToken = tokenResponse.data.access_token

        const userInfoResponse = await getInfoAccountUseAccessToke(accessToken)
        setUserInfo(userInfoResponse.data)
        const saveAccountGoogleOAuth = await saveAccountToServer(userInfoResponse?.data)

        if (saveAccountGoogleOAuth?.data?.code === 0) {
          const infoLoginJWT = await readProfileJWT()
          if (infoLoginJWT?.data?.code === 0) {
            const infoAccountLogin = jwtDecode(infoLoginJWT?.data?.data?.jwt)
            if (infoAccountLogin?.userPresent?.position?.key_position === 1) {
              localStorage.setItem('infoAccountLogin', JSON.stringify(infoAccountLogin))
              toast.success(saveAccountGoogleOAuth?.data?.message)
              navigate(config.routes.dashboard)
            } else {
              toast.error('account is not admin')
            }
          }
        } else {
          toast.error(saveAccountGoogleOAuth?.data?.message)
        }
      } catch (error) {setError(error)}
    },
    onError: (errorResponse) => {setError(errorResponse)}
  })
  return (
    <button type="button" className="d-flex align-items-center btn btn-outline-secondary custom-hover" onClick={() => googleLogin()}>
      <FcGoogle /><span className='mx-1'>{''}</span><span className='size-14'>Google</span>
    </button>
  )
}

export default LoginWithGoogle
