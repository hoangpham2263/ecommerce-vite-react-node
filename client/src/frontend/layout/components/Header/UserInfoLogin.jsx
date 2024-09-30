import { PiUserCircleThin } from 'react-icons/pi'
import { logoutAccount } from '../../../../main/services/sharedApi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LocalStorageGetInfo } from '../../../../main/components/LocalStorageMethod'
import config from '../../../config'

const UserInfoLogin = () => {
  const LocalStorageGetInfos = LocalStorageGetInfo() || {}
  const navigate = useNavigate()

  const handleLogout = async () => {
    let response = await logoutAccount()
    if (response?.data?.code === 0) {
      if (response?.data?.code === 0) {
        localStorage.removeItem('infoAccountLogin')
        toast.success(response?.data?.message)
        navigate('/')
      }
    } else {
      toast.error(response?.data?.message)
    }
  }

  const handleRedirectAdmin = () => {
    navigate(config.routes.homeAdmin)
  }

  return (
    <div>
      {
        LocalStorageGetInfo() ?
          (<div className="cs-nav-item cs-nav-item-login cs-nav-item-bg d-flex flex-column dropdown" data-bs-toggle="dropdown">
            <div className="dropdown-toggle d-flex justify-content-center align-items-center" aria-expanded="false">
              {LocalStorageGetInfos?.user?.avatar ? <img className='img-avatar' src={LocalStorageGetInfos?.user?.avatar} /> : <PiUserCircleThin className='cs-nav-item-icon m-0' />}
            </div>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><Link className="dropdown-item">{LocalStorageGetInfos?.user?.full_name}</Link></li>
              <li><Link className="dropdown-item">Role: {LocalStorageGetInfos?.position?.name}</Link></li>

              {LocalStorageGetInfos?.position?.key_position === 1 && <li><Link className="dropdown-item" onClick={handleRedirectAdmin} >Website Management</Link></li>}
              <li><hr className="dropdown-divider" /></li>
              <li><div className="dropdown-item" onClick={handleLogout}>Logout</div></li>
            </ul>
          </div>)
          : (
            <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='cs-nav-item cs-nav-item-bg d-flex flex-column'>
              <PiUserCircleThin className='cs-nav-item-icon m-0' />
              <p className='gl-fz-12 m-0'>Đăng nhập</p>
            </button>
          )
      }
    </div>

  )
}

export default UserInfoLogin
