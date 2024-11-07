import classNames from 'classnames/bind'
import styles from './Cart.module.scss'


const cx = classNames.bind(styles)
const CartItem = () => {

  return (
    <div className={cx('cs-wrapper')}>
      CartItem
    </div>
  )
}

export default CartItem
