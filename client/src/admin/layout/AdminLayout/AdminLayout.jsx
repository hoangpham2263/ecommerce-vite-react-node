import classNames from 'classnames/bind'
import styles from './AdminLayout.module.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'

const cx = classNames.bind(styles)

const AdminLayout = ({ children }) => {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>{children}</div>
      <Footer />
    </div>
  )
}


export default AdminLayout
