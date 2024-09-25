import './LogoSmall.css'
import { FaOpencart } from 'react-icons/fa6'
import { BsFillBagFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import config from '../../config'


const LogoSmall = () => {
  return (
    <Link className='cs-wrap-logo' to={`${config.routes.home}`}>
      <div className='cs-text-logo'>
        Ecommerce
      </div>
      <div className='cs-border-rs'>
        <BsFillBagFill className='cs-icon-outside'/>
        <FaOpencart className='cs-icon-inside'/>
      </div>
    </Link>
  )
}

export default LogoSmall
