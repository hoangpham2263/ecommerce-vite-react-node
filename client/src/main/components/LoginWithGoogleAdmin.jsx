import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../context/AuthContext'

const LoginWithGoogle = () => {
  // const navigate = useNavigate()

  // // eslint-disable-next-line no-unused-vars
  // const [userInfo, setUserInfo] = useState(null)
  // // eslint-disable-next-line no-unused-vars
  // const [error, setError] = useState(null)
  // const googleLogin = useGoogleLogin({
  //   flow: 'auth-code',
  //   onSuccess: async (response) => {
  //     try {
  //       const tokenResponse = await confirmGetToken(response)

  //       const accessToken = tokenResponse.data.access_token

  //       const userInfoResponse = await getInfoAccountUseAccessToke(accessToken)
  //       setUserInfo(userInfoResponse.data)
  //       const saveAccountGoogleOAuth = await saveAccountToServer(userInfoResponse?.data)
  //       if (saveAccountGoogleOAuth?.data?.code === 0) {
  //         const infoLoginJWT = await readProfileJWT()
  //         if (infoLoginJWT?.data?.code === 0) {
  //           const infoAccountLogin = jwtDecode(infoLoginJWT?.data?.data?.jwt)
  //           if (infoAccountLogin?.userPresent?.position?.is_master === true) {
  //             localStorage.setItem('infoAccountLogin', JSON.stringify(infoAccountLogin))
  //             toast.success(saveAccountGoogleOAuth?.data?.message)
  //             navigate(config.routes.account)
  //           } else {
  //             toast.error('account is not admin')
  //           }
  //         }
  //       } else {
  //         toast.error(saveAccountGoogleOAuth?.data?.message)
  //       }
  //     } catch (error) { setError(error) }
  //   },
  //   onError: (errorResponse) => { setError(errorResponse) }
  // })
  const { loginWithGoogleAdmin } = useAuth()

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault()
    await loginWithGoogleAdmin()
  }
  return (
    <button type="button" className="d-flex align-items-center btn btn-outline-secondary custom-hover" onClick={handleLoginWithGoogle}>
      <FcGoogle /><span className='mx-1'>{''}</span><span className='size-14'>Google</span>
    </button>
  )
}

export default LoginWithGoogle
