import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageReload from '../../../main/components/PageReload/PageReload'
import { AuthProvider } from '../../../main/context/AuthContext.jsx'
import { CountCartProvider } from '../../hooks/useContext.jsx'

const cx = classNames.bind(styles)

const DefaultLayout = ({ children }) => {
  return (
    <CountCartProvider>
      <AuthProvider>
        <div className={cx('wrapper')}>
          <Header />
          <PageReload>
            <div className={cx('container-default')}>{children}</div>
            <Footer />
          </PageReload>
          <div>
          </div>
        </div>
      </AuthProvider>
    </CountCartProvider>
  )
}


export default DefaultLayout
