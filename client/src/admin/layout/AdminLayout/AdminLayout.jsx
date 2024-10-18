import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

import classNames from 'classnames/bind'
import styles from './AdminLayout.module.scss'

const cx = classNames.bind(styles)

const AdminLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='d-flex'>
        <div className={cx('sidebar')}>
          <Sidebar />
        </div>
        <div className='d-flex flex-column w-100'>
          <div className='p-5 pt-4 h-100'>{children}</div>
          <div className={cx('footer', 'p-4 pt-3')}><Footer /></div>
        </div>
      </div>
    </div>
  )
}


export default AdminLayout
