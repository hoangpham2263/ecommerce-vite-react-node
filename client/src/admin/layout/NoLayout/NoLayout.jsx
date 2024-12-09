import classNames from 'classnames/bind'
import styles from './NoLayout.module.scss'
import PageReload from '../../../main/components/PageReload'
import { AuthProviderAdmin } from '../../../main/context/AuthContextAdmin'

const cx = classNames.bind(styles)

const NoLayout = ({ children }) => {
  return (
    <AuthProviderAdmin>
      <div className={cx('wrapper')}>
        <PageReload>
          <div className={cx('container')}>{children}</div>
        </PageReload>
      </div>
    </AuthProviderAdmin>

  )
}


export default NoLayout
