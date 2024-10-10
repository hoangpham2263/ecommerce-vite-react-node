import LogoSmall from '../../../components/Logo/LogoSmall'
import Search from '../Search'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const Header = () => {
  return (
    <header className={cx('ct-wrapper')}>
      <div className={cx('d-flex justify-content-between', 'ct-inner')}>
        <div className=''><LogoSmall /></div>
        <div className=''><Search /></div>
        <div className=''>
          <div className={cx('dropdown')}>
            <Link className={cx('ct-drop-avatar', 'dropdown-toggle')} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              1
            </Link>

            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="/">Action</Link></li>
              <li><Link className="dropdown-item" href="#">Another action</Link></li>
              <li><Link className="dropdown-item" href="#">Something else here</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </header >
  )
}

export default Header
