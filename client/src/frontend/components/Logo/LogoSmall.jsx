import './LogoSmall.css'
import { FaOpencart } from 'react-icons/fa6'
import { BsFillBagFill } from 'react-icons/bs'
import config from '../../config'


const LogoSmall = () => {
  return (
    <a className='cs-wrap-logo' href={`${config.routes.home}`}>
      <div className='cs-text-logo'>
        Ecommerce
      </div>
      <div className='cs-border-rs'>
        <BsFillBagFill className='cs-icon-outside' />
        <FaOpencart className='cs-icon-inside' />
      </div>
    </a>
  )
}

export default LogoSmall
