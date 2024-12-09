import { FcGoogle } from 'react-icons/fc'
import { useAuthAdmin } from '../context/AuthContextAdmin'

const LoginWithGoogle = () => {
  const { loginWithGoogleAdmin } = useAuthAdmin()

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
