import classNames from 'classnames/bind'
import styles from './NoLayout.module.scss'
import PageReload from '../../../main/components/PageReload'
import { AuthProvider } from '../../../main/context/AuthContext'
import { CountCartProvider } from '../../hooks/useContext.jsx'

const cx = classNames.bind(styles)

const NoLayout = ({ children }) => {
  return (
    <AuthProvider>
      <CountCartProvider>
        <div className={cx('wrapper')}>
          <PageReload>
            <div className={cx('container')}>{children}</div>
          </PageReload>
        </div>
      </CountCartProvider>
    </AuthProvider>

  )
}


export default NoLayout
