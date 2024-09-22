import classNames from 'classnames/bind'
import styles from './NoLayout.module.scss'
// import Header from '../components/Header'
// import Footer from '../components/Footer'

const cx = classNames.bind(styles)

const NoLayout = ({ children }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>{children}</div>
    </div>
  )
}


export default NoLayout
