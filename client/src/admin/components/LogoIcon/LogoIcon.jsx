import './LogoIcon.css'
import { FaOpencart } from 'react-icons/fa6'
import { BsFillBagFill } from 'react-icons/bs'


const LogoIcon = () => {
  return (
    <div className='border-rs'>
      <BsFillBagFill className='icon-outside'/>
      <FaOpencart className='icon-inside'/>
    </div>
  )
}

export default LogoIcon
