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
      <div className='row'>
        <div className={cx('sidebar', 'col-2')}>
          <Sidebar />
        </div>
        <div className='col-10 d-flex flex-column'>
          <div >{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  )
}


export default AdminLayout
