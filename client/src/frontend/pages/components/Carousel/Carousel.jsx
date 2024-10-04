import './Carousel.css'

const Carousel = () => {
  const carousels = [
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/m55-gia-moi-right-banner-30-8-2024.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/m55-gia-moi-right-banner-30-8-2024.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/watch-gt-5-series-03-10-home-new-new.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/Mo-ban-Galaxy-Tab-S10-Series-home.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/tecno-camon-30-home-4-10.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/thu-cu-banner-390-home.jpg'
  ]
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3 d-flex flex-column justify-content-between'>
          <img className='d-block w-100 cs-border-7 cs-box-shadow' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/m55-gia-moi-right-banner-30-8-2024.png' />
          <img className='d-block w-100 cs-border-7 cs-box-shadow' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/thu-cu-banner-390-home.jpg' />
        </div>
        <div className='col-6 px-0'>
          <div id="carouselExampleAutoplaying" className="carousel slide cs-border-7 cs-box-shadow" data-bs-ride="carousel">
            <div className="carousel-inner cs-border-7">
              <div className="carousel-item active">
                <img src={'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/sliding-home-iphone-16-pro-km-moi.jpg'} className="d-block w-100" alt="..." />
              </div>
              {carousels.map((carousel, index) => {
                return <div key={index} className="carousel-item">
                  <img src={carousel} className="d-block w-100" alt="..." />
                </div>
              })}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className='col-3 d-flex flex-column justify-content-between'>
          <img className='d-block w-100 cs-border-7 cs-box-shadow' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/right-banner-mo-ban-ip-16-26-09.jpg' />
          <img className='d-block w-100 cs-border-7 cs-box-shadow' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/b2s-2024-right-banner-laptop.jpg' />
        </div>
      </div>
      <div className='row'>
        <div className='my-3'>
          <img className='d-block w-100 cs-border-7 cs-box-shadow' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:1200:75/q:90/plain/https://dashboard.cellphones.com.vn/storage/b2s-update-19-06 (1).gif' />
        </div>
      </div>
    </div>

  )
}

export default Carousel
