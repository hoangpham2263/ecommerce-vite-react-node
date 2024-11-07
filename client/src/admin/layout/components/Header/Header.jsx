import LogoSmall from '../../../components/Logo/LogoSmall'
import Search from '../Search'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { LocalStorageGetInfo } from '../../../../main/components/LocalStorageMethod'

const cx = classNames.bind(styles)

const Header = () => {
  const infoLogins = LocalStorageGetInfo()
  return (
    <header className={cx('ct-wrapper')}>
      <div className={cx('d-flex justify-content-between', 'ct-inner')}>
        <div className=''><LogoSmall /></div>
        <div className=''><Search /></div>
        <div className=''>
          <div className={cx('dropdown')}>
            <a className={cx('ct-drop-avatar', 'dropdown-toggle')} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img className={cx('ct-img-avatar')} src={infoLogins?.user?.avatar} />
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="/">Profile</a></li>
              <li><a className="dropdown-item" href="#">Dashboard</a></li>
              <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header >
  )
}

export default Header
