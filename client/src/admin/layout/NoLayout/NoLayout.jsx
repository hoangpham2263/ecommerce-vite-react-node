import classNames from 'classnames/bind'
import styles from './NoLayout.module.scss'
import PageReload from '../../../main/components/PageReload'

const cx = classNames.bind(styles)

const NoLayout = ({ children }) => {
  return (
    <div className={cx('wrapper')}>
      <PageReload>
        <div className={cx('container')}>{children}</div>
      </PageReload>
    </div>
  )
}


export default NoLayout
