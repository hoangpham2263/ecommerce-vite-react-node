import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageReload from '../../../main/components/PageReload/PageReload'

const cx = classNames.bind(styles)

const DefaultLayout = ({ children }) => {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <PageReload>
        <div className={cx('container-default')}>{children}</div>
        <Footer />
      </PageReload>
    </div>
  )
}


export default DefaultLayout
