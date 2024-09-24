import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useState } from 'react'

const useGoogleAuth = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState(null)

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (response) => {
      try {
        // Gửi mã xác thực tới backend để lấy access token
        const tokenResponse = await axios.post('http://localhost:8000/auth/google', {
          code: response.code
        })

        const accessToken = tokenResponse.data.access_token

        // Lấy thông tin người dùng
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        setUserInfo(userInfoResponse.data) // Lưu thông tin người dùng
      } catch (error) {
        setError(error) // Lưu lỗi nếu có
      }
    },
    onError: (errorResponse) => {
      setError(errorResponse)
    }
  })

  return { googleLogin, userInfo, error }
}

export default useGoogleAuth
