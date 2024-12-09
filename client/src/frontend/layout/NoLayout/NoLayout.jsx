import classNames from 'classnames/bind'
import styles from './NoLayout.module.scss'
import PageReload from '../../../main/components/PageReload'
import { AuthProvider } from '../../../main/context/AuthContext'
import useFetchAmountCart from '../../hooks/useFetchAmountCart.jsx'
import { useEffect } from 'react'

const cx = classNames.bind(styles)

const NoLayout = ({ children }) => {
  const fetchAmountCart = useFetchAmountCart()
  useEffect(() => { fetchAmountCart() }, [])

  return (
    <AuthProvider>
      <div className={cx('wrapper')}>
        <PageReload>
          <div className={cx('container')}>{children}</div>
        </PageReload>
      </div>
    </AuthProvider>

  )
}


export default NoLayout
