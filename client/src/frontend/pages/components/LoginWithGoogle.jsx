import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

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
        const tokenResponse = await axios.post(`${import.meta.env.VITE_API_API_URL}/api/admin/auth/google`,
          { code: response.code }
        )

        const accessToken = tokenResponse.data.access_token

        const userInfoResponse = await axios.get(`${import.meta.env.VITE_API_GOOGLE_CLIENT_ID}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        setUserInfo(userInfoResponse.data)
        const saveAccountGoogleOAuth = await axios.post(`${import.meta.env.VITE_API_API_URL}/api/admin/auth/google/create`, { data: userInfoResponse?.data },
          { headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true })

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
