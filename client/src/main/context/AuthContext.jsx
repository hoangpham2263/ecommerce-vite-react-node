import { jwtDecode } from 'jwt-decode'
import { createContext, useState, useEffect, useContext } from 'react'
import { loginAccountBasic, logoutAccount, readCheckSession } from '../services/sharedApi.jsx'
import config from '../../frontend/config'

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
          console.log(fetchCheckSessionUser)
          setUser(null)
        }
      } catch (error) {
        setUser(null)
      }
    }
    fetchUserProfile()
  }, [])

  const login = async (data) => {
    let res = await loginAccountBasic(data)
    const access_token = jwtDecode(res?.data?.jwt)
    setUser(access_token?.userPresent)
  }

  const logout = async () => {
    await logoutAccount()
    setUser(null)
    window.location.href = config.routes.home
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
