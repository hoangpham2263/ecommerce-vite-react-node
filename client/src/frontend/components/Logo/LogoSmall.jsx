import './LogoSmall.css'
import { FaOpencart } from 'react-icons/fa6'
import { BsFillBagFill } from 'react-icons/bs'


const LogoSmall = () => {
  return (
    <div className='cs-wrap-logo'>
      <div className='cs-text-logo'>
        Ecommerce
      </div>
      <div className='cs-border-rs'>
        <BsFillBagFill className='cs-icon-outside'/>
        <FaOpencart className='cs-icon-inside'/>
      </div>
    </div>
  )
}

export default LogoSmall
