import { createContext, useState, useEffect, useContext } from 'react'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { useGoogleLogin } from '@react-oauth/google'
import {
  loginAccountBasicAdmin,
  confirmGetTokenAdmin,
  getInfoAccountUseAccessTokeAdmin,
  saveAccountToServerAdmin,
  logoutAccountAdmin,
  readCheckSessionAdmin
} from '../services/apiAuthentication.jsx'
import configAdmin from '../../admin/config/index.jsx'

const AuthContextAdmin = createContext()

export const AuthProviderAdmin = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const fetchCheckSessionUser = await readCheckSessionAdmin()
        const access_token = jwtDecode(fetchCheckSessionUser?.data?.jwt_admin)
        if (access_token?.userPresent?.position?.is_admin) {
          if (window.location.pathname === '/admin') {
            window.location.href = configAdmin.routes.dashboard
          }
          setUser(access_token?.userPresent)
        } else {
          setUser(null)
          if (window.location.pathname !== '/admin') {
            window.location.href = configAdmin.routes.login
          }
        }
      } catch (error) {
        setUser(null)
        if (window.location.pathname !== '/admin') {
          window.location.href = configAdmin.routes.login
        }
      }
    }
    fetchUserProfile()
  }, [])

  const loginAdmin = async (data) => {
    try {
      await loginAccountBasicAdmin(data)
      window.location.href = configAdmin.routes.account
    } catch (error) {
      toast.error(error?.response?.data.message)
    }
  }

  const loginWithGoogleAdmin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (response) => {
      try {
        const tokenResponse = await confirmGetTokenAdmin(response)
        const accessToken = tokenResponse.data.access_token

        const userInfoResponse = await getInfoAccountUseAccessTokeAdmin(accessToken)
        await saveAccountToServerAdmin(userInfoResponse?.data)
        window.location.href = configAdmin.routes.account
      } catch (error) {
        toast.error(error?.response?.data.message)
      }
    },
    onError: (errorResponse) => {
      toast.error('Google login failed.')
    }
  })

  const logoutAdmin = async () => {
    await logoutAccountAdmin()
    setUser(null)
    window.location.href = configAdmin.routes.account
  }

  return (
    <AuthContextAdmin.Provider value={{ user, loginAdmin, loginWithGoogleAdmin, logoutAdmin }}>
      {children}
    </AuthContextAdmin.Provider>
  )
}

export const useAuthAdmin = () => useContext(AuthContextAdmin)
