import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { confirmGetToken, getInfoAccountUseAccessToke, saveAccountToServer } from '../../main/services/sharedApi'

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

        if (saveAccountGoogleOAuth.status === 200) {
          toast.success(saveAccountGoogleOAuth?.data?.message)
          navigate('/')
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
