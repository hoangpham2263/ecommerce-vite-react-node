import { useState } from 'react'
import './BannerTopHead.css'
import { GrPrevious, GrNext } from 'react-icons/gr'


const BannerTopHead = () => {
  const [idxBanner, setIdxBanner] = useState(0)
  const arrBanner = [
    'https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top banner_Thu cu.svg',
    'https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top banner_Smember.svg',
    'https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top banner_Giao hang.svg',
    'https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top banner_Chinh hang.svg'
  ]

  const handlePrevBanner = () => {
    setIdxBanner(idxBanner - 1)
  }

  const handleNextBanner = () => {
    setIdxBanner(idxBanner + 1)
  }
  return (
    <div className='w-100 gl-height-40 gl-bg-banner'>
      <div className='container  h-100'>
        <div className='raw d-flex align-items-center h-100 cs-bl-banner'>
          {
            arrBanner.slice(idxBanner, idxBanner + 3).map((img, index) => {
              return (<img key={`img-${index}`} className='col-4 gl-bg-transparent cs-img-banner' src={img} />)
            })
          }
          {idxBanner > 0 ? (<div className='cs-prev-banner' onClick={handlePrevBanner}><GrPrevious className='cs-icon-banner' /></div>) : false}
          {idxBanner < arrBanner.length - 3 ? (<div className='cs-prev-next' onClick={handleNextBanner}><GrNext className='cs-icon-banner' /></div>) : false}
        </div>
      </div>
    </div>
  )
}

export default BannerTopHead
