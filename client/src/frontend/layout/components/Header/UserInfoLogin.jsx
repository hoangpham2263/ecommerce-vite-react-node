import { PiUserCircleThin } from 'react-icons/pi'
import config from '../../../config'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { useAuth } from '../../../../main/context/AuthContext'

const cx = classNames.bind(styles)

const UserInfoLogin = () => {
  const { user, logout } = useAuth()
  const LocalStorageGetInfos = user
  const handleLogout = async () => {
    await logout()
  }

  const handleRedirectAdmin = () => {
    window.location.href = config.routes.homeAdmin
  }

  return (
    <div>
      {
        LocalStorageGetInfos ? (
          <div className={cx('cs-nav-item', 'cs-nav-item-login', 'cs-nav-item-bg', 'd-flex', 'flex-column', 'dropdown')} data-bs-toggle="dropdown">
            <div className="dropdown-toggle d-flex justify-content-center align-items-center" aria-expanded="false">
              {LocalStorageGetInfos?.user?.avatar ? (
                <img className={cx('img-avatar')} src={LocalStorageGetInfos?.user?.avatar} />
              ) : (
                <PiUserCircleThin className={cx('cs-nav-item-icon', 'm-0')} />
              )}
            </div>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item">{LocalStorageGetInfos?.user?.full_name}</a></li>
              <li><a className="dropdown-item">Role: {LocalStorageGetInfos?.position?.name}</a></li>

              {LocalStorageGetInfos?.position?.key_position === 1 && (
                <li><a className="dropdown-item" onClick={handleRedirectAdmin}>Website Management</a></li>
              )}
              <li><hr className="dropdown-divider" /></li>
              <li><div className="dropdown-item" onClick={handleLogout}>Logout</div></li>
            </ul>
          </div>
        ) : (
          <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className={cx('cs-nav-item', 'cs-nav-item-bg', 'd-flex', 'flex-column')}>
            <PiUserCircleThin className={cx('cs-nav-item-icon', 'm-0')} />
            <p className={cx('gl-fz-12', 'm-0')}>Đăng nhập</p>
          </button>
        )
      }
    </div>
  )
}

export default UserInfoLogin
