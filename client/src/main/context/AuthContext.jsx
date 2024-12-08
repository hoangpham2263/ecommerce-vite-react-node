import { createContext, useState, useEffect, useContext } from 'react'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { useGoogleLogin } from '@react-oauth/google'
import {
  confirmGetToken,
  getInfoAccountUseAccessToke,
  saveAccountToServer,
  loginAccountBasic,
  logoutAccount,
  readCheckSession
} from '../services/sharedApi.jsx'
import config from '../../frontend/config'
import configAdmin from '../../admin/config'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const fetchCheckSessionUser = await readCheckSession()
        if (fetchCheckSessionUser.status === 200) {
          const access_token = jwtDecode(fetchCheckSessionUser?.data?.jwt)
          setUser(access_token?.userPresent)
        } else {
          setUser(null)
        }
      } catch (error) {
        setUser(null)
      }
    }
    fetchUserProfile()
  }, [])

  const login = async (data) => {
    try {
      await loginAccountBasic(data)
      window.location.href = config.routes.home
    } catch (error) {
      toast.error(error?.response?.data.message)
    }
  }

  const loginWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (response) => {
      try {
        const tokenResponse = await confirmGetToken(response)
        const accessToken = tokenResponse.data.access_token

        const userInfoResponse = await getInfoAccountUseAccessToke(accessToken)
        const saveAccountGoogleOAuth = await saveAccountToServer(userInfoResponse?.data)

        if (saveAccountGoogleOAuth.status === 200) {
          window.location.href = config.routes.home
        } else {
          setUser(null)
        }
      } catch (error) {
        toast.error('Error during Google login:', error)
      }
    },
    onError: (errorResponse) => {
      toast.error('Google login failed.')
    }
  })

  const loginAdmin = async (data) => {
    try {
      await loginAccountBasic(data)
      window.location.href = config.routes.home
    } catch (error) {
      toast.error(error?.response?.data.message)
    }
  }

  const loginWithGoogleAdmin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (response) => {
      try {
        const tokenResponse = await confirmGetToken(response)
        const accessToken = tokenResponse.data.access_token

        const userInfoResponse = await getInfoAccountUseAccessToke(accessToken)
        const saveAccountGoogleOAuth = await saveAccountToServer(userInfoResponse?.data)

        if (saveAccountGoogleOAuth.status === 200) {
          window.location.href = configAdmin.routes.account
        } else {
          setUser(null)
        }
      } catch (error) {
        toast.error('Error during Google login:', error)
      }
    },
    onError: (errorResponse) => {
      toast.error('Google login failed.')
    }
  })


  const logout = async () => {
    await logoutAccount()
    setUser(null)
    window.location.href = config.routes.home
  }

  return (
    <AuthContext.Provider value={{ user, login, loginAdmin, loginWithGoogle, loginWithGoogleAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
