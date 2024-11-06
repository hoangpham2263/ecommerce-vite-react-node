import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'
import { useEffect, useState } from 'react'
import { readImage, readProductDetail } from '../../services/publicApi'
import { Link, useParams } from 'react-router-dom'
import './HomeDetail.css'
import { CiMobile4 } from 'react-icons/ci'
import { SlSocialDropbox } from 'react-icons/sl'
import { AiOutlineSecurityScan } from 'react-icons/ai'
import { MdAttachMoney } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { FiRefreshCw } from 'react-icons/fi'
import { FaGift } from 'react-icons/fa'
import { MdAddShoppingCart } from 'react-icons/md'
import { GoShieldCheck } from 'react-icons/go'
import { FaStar } from 'react-icons/fa'
import Specifications from './Specifications'

const cx = classNames.bind(styles)

const HomeDetail = () => {
  const [product, setProduct] = useState({})
  const [activeIndex, setActiveIndex] = useState(0)
  const { slug } = useParams()
  const [selectedOption, setSelectedOption] = useState('')

  const dataSlideRight = [
    'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730785821/uploadLocal_ecommerce/slide%20right%201.webp',
    'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730785821/uploadLocal_ecommerce/slide%20right%202.webp',
    'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730785821/uploadLocal_ecommerce/slide%20right%201.webp',
    'https://res.cloudinary.com/dqhj1sukr/image/upload/v1730785821/uploadLocal_ecommerce/slide%20right%202.webp'
  ]

  const fetchProductData = async () => {
    try {
      const fetchDataImage = await readImage(1, 100)
      const fetchDataProduct = await readProductDetail(slug)

      const imageData = fetchDataImage?.data?.data?.image
      const productData = fetchDataProduct?.data?.data

      const filteredImages = await imageData.filter(prod => prod?.product_id === productData.id)
      const imagesDetail = [...filteredImages]
      const groupedProducts = {
        ...productData,
        images: filteredImages,
        imagesDetail: imagesDetail
      }

      setProduct(groupedProducts)
    } catch (error) {
      console.error('Error fetching product data:', error)
    }
  }

  useEffect(() => { fetchProductData() }, [slug])

  const handleThumbnailClick = (index) => {
    setActiveIndex(index)
  }
  console.log(product)
  return (
    <div className={cx('wrapper', 'container')}>
      {/* <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 pt-3">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Demo</a></li>
          <li className="breadcrumb-item active" aria-current="page">{product?.title}</li>
        </ol>
      </nav> */}
      <h5 className={cx('pt-4', 'm-0')}>{product?.title}</h5>
      <hr className={cx('cs-line')} />
      <div className={cx('row', 'mb-2')}>
        {/* col left */}
        <div className={cx('col-md-7')}>
          {/* display images */}
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              {product?.images?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={cx('carousel-item', 'cs-img-bl', { active: index === activeIndex })}
                  >
                    <img src={item?.url} className={cx('cs-img')} alt="..." />
                  </div>
                )
              })}
            </div>
            <button className={cx('carousel-control-prev', 'justify-content-start')} type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className={cx('visually-hidden')}>Previous</span>
            </button>
            <button className={cx('carousel-control-next', 'justify-content-end')} type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className={cx('visually-hidden')}>Next</span>
            </button>
          </div>
          <div className={cx('row', 'mt-3', 'px-2')}>
            {product?.imagesDetail?.map((item, index) => {
              return (
                <img
                  key={index}
                  src={item?.url}
                  className={cx('cs-img-des', 'col-1', 'p-0')}
                  alt="..."
                  onClick={() => handleThumbnailClick(index)}
                />
              )
            })}
          </div>
          {/* product info */}
          <div className={cx('row', 'mt-3', 'px-2', 'mb-3')}>
            <div className={cx('col-md-6', 'cs-prod-info', 'px-2', 'pb-0', 'pt-3')}>
              <h5 className={cx('fw-medium', 'fs-5')}>Thông tin sản phẩm</h5>
              <div className={cx('d-flex', 'align-items-center', 'mb-3', 'fw-lighter')}>
                <CiMobile4 className={cx('me-2', 'm-0', 'fs-4')} />
                <p className={cx('m-0', 'd-flex', 'align-items-center')}>Mới, đầy đủ phụ kiện từ nhà sản xuất</p>
              </div>
              <div className={cx('d-flex', 'align-items-center', 'fw-lighter')}>
                <SlSocialDropbox className={cx('me-2', 'm-0', 'fs-5')} />
                <p className={cx('m-0', 'd-flex', 'align-items-center')}>Mới, đầy đủ phụ kiện từ nhà sản xuất</p>
              </div>
              <p className={cx('my-0', 'ms-4', 'ps-1', 'd-flex', 'align-items-center', 'fw-lighter')}>2. Cáp truyền dữ liệu</p>
              <p className={cx('my-0', 'ms-4', 'ps-1', 'd-flex', 'align-items-center', 'fw-lighter')}>3. Que lấy sim</p>
              <p className={cx('my-0', 'ms-4', 'ps-1', 'd-flex', 'align-items-center', 'fw-lighter', 'mb-3')}>* Galaxy S24 Ultra không bao gồm củ sạc.</p>
              <div className={cx('d-flex', 'align-items-start', 'mb-3', 'fw-lighter')}>
                <AiOutlineSecurityScan className={cx('me-2', 'm-0', 'fs-1')} />
                <p className={cx('m-0')}>Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất. <span className={cx('text-danger')}>(xem chi tiết)</span></p>
              </div>
              <div className={cx('d-flex', 'align-items-center', 'fw-lighter')}>
                <MdAttachMoney className={cx('me-2', 'm-0', 'fs-5')} />
                <p className={cx('m-0', 'd-flex', 'align-items-center')}>Giá sản phẩm đã bao gồm VAT</p>
              </div>
            </div>
            <div className={cx('col-md-6', 'pt-0', 'pe-0', 'pb-0')}>
              <div className={cx('row', 'mb-2')}>
                <div className={cx('col-6')}>
                  <div className={cx('cs-prod-info', 'text-center', 'py-2')}>
                    Hồ Chí Minh
                  </div>
                </div>
                <div className={cx('col-6')}>
                  <div >
                  </div>
                  <select
                    className={cx('cs-prod-info', 'px-3', 'py-2', 'form-select')}
                    aria-label="Default select example"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  >
                    <option value="" disabled>Quận / Huyện</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                  </select>
                </div>
              </div>
              <div className={cx('row', 'mb-2')}>
                <p className={cx('my-0', 'ms-2', 'ps-1', 'd-flex', 'align-items-center', 'fw-lighter', 'mb-2')}>Có <strong className={cx('ms-2')}>8</strong> cửa hàng có sản phẩm</p>
                <div className={cx('col-md-12')}>
                  <div className={cx('cs-prod-info', 'cs-bl-site', 'p-2', 'pe-0')}>
                    <table className="table table-striped m-0">
                      <thead>
                        <tr className={cx('d-none')}>
                          <th scope="col" className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0')}><FaPhoneAlt className={cx('cs-icon-phone')} /></th>
                          <th className={cx('cs-line')}>-</th>
                          <th scope="col" className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} /></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr >
                          <th scope="col" className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871068880</th>
                          <th className={cx('cs-line')}>-</th>
                          <th scope="col" className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />888 Tỉnh Lộ 10, P. Bình Trị Đông A, Q. Bình Tân</th>
                        </tr>
                        <tr >
                          <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871087386</td>
                          <td className={cx('cs-line')}>-</td>
                          <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />386 Hương Lộ 2, P. Bình Trị Đông, Q. Bình Tân (Ngã Tư Bốn Xã)</td>
                        </tr>
                        <tr >
                          <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871000229</td>
                          <td className={cx('cs-line')}>-</td>
                          <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />127 Nguyễn Thị Tú, P. Bình Hưng Hoà B, Q. Bình Tân</td>
                        </tr>
                        <tr >
                          <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871016161</td>
                          <td className={cx('cs-line')}>-</td>
                          <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />161 Nguyễn Sơn, P. Phú Thạnh, Q. Tân Phú</td>
                        </tr>
                        <tr >
                          <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871000449</td>
                          <td className={cx('cs-line')}>-</td>
                          <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />449 - 451 Tân Kỳ Tân Quý, P. Tân Quý, Q. Tân Phú, TP. HCM</td>
                        </tr>
                        <tr >
                          <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871097020</td>
                          <td className={cx('cs-line')}>-</td>
                          <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />114 Phan Đăng Lưu, P. 3, Q. Phú Nhuận</td>
                        </tr>
                        <tr >
                          <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871067171</td>
                          <td className={cx('cs-line')}>-</td>
                          <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />177 Khánh Hội, P. 3, Q. 4</td>
                        </tr>
                        <tr >
                          <td className={cx('py-2', 'fw-medium', 'cs-site', 'text-danger', 'pe-0', 'cs-text-phone')}><FaPhoneAlt className={cx('cs-icon-phone')} />02871011785</td>
                          <td className={cx('cs-line')}>-</td>
                          <td className={cx('py-2', 'fw-light', 'cs-site', 'th-nowrap')}><FaLocationDot className={cx('cs-icon-phone')} />785 Trần Hưng Đạo, P.1, Q.5, TP. HCM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {/*  */}
          <Specifications />
        </div>
        {/* col right */}
        <div className={cx('col-md-5')}>
          {/* capacity */}
          <div className={cx('row', 'mb-1', 'pe-1')}>
            <div className={cx('col-md-3', 'pe-1')}>
              <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3')}>
                <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
                <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
              </div>
            </div>
            <div className={cx('col-md-3', 'pe-1')}>
              <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3')}>
                <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
                <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
              </div>
            </div>
            <div className={cx('col-md-3', 'pe-1')}>
              <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3')}>
                <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
                <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
              </div>
            </div>
            <div className={cx('col-md-3', 'pe-1')}>
              <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3')}>
                <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
                <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
              </div>
            </div>
          </div>
          {/* color */}
          <p className={cx('mb-2', 'd-flex', 'align-items-center', 'fw-medium')}>Chọn màu để xem giá và chi nhánh có hàng</p>
          <div className={cx('row', 'mb-1', 'pe-1')}>
            <div className={cx('col-md-3', 'pe-1')}>
              <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3', 'd-flex', 'align-items-center', 'justify-content-center')}>
                <img src={product && product?.imagesDetail && product?.imagesDetail[0]?.url} className={cx('cs-img-capacity')} alt="..." />
                <div >
                  <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
                  <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
                </div>
              </div>
            </div>
            <div className={cx('col-md-3', 'pe-1')}>
              <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3', 'd-flex', 'align-items-center', 'justify-content-center')}>
                <img src={product && product?.imagesDetail && product?.imagesDetail[0]?.url} className={cx('cs-img-capacity')} alt="..." />
                <div >
                  <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
                  <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
                </div>
              </div>
            </div>
            <div className={cx('col-md-3', 'pe-1')}>
              <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3', 'd-flex', 'align-items-center', 'justify-content-center')}>
                <img src={product && product?.imagesDetail && product?.imagesDetail[0]?.url} className={cx('cs-img-capacity')} alt="..." />
                <div >
                  <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
                  <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
                </div>
              </div>
            </div>
            <div className={cx('col-md-3', 'pe-1')}>
              <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3', 'd-flex', 'align-items-center', 'justify-content-center')}>
                <img src={product && product?.imagesDetail && product?.imagesDetail[0]?.url} className={cx('cs-img-capacity')} alt="..." />
                <div >
                  <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
                  <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
                </div>
              </div>
            </div>
            <div className={cx('col-md-3', 'pe-1')}>
              <div className={cx('cs-cursor-link', 'cs-prod-capacity', 'text-center', 'py-1', 'mb-3', 'd-flex', 'align-items-center', 'justify-content-center')}>
                <img src={product && product?.imagesDetail && product?.imagesDetail[0]?.url} className={cx('cs-img-capacity')} alt="..." />
                <div >
                  <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-medium', 'cs-text-capacity')}>12GB 1TB</p>
                  <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-lighter', 'cs-text-capacity')}>33.490.000 đ</p>
                </div>
              </div>
            </div>
          </div>
          {/* old - new */}
          <div className={cx('row', 'mb-3', 'cs-old-new', 'px-0', 'py-2', 'mx-0')}>
            <div className={cx('col-md-6', 'ps-2')}>
              <div className={cx('px-2', 'd-lex', 'align-items-center', 'cs-old-new-btn-hover')}>
                <div className={cx('cs-cursor-link', 'text-center', 'py-1', 'd-flex', 'align-items-center', 'justify-content-center')}>
                  <FiRefreshCw className={cx('fs-3', 'me-3')} />
                  <div >
                    <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-medium', 'cs-old-new-top')}>25.990.000đ</p>
                    <p className={cx('my-0', 'd-flex', 'justify-content-start', 'fw-normal', 'cs-old-new-bot')}>Khi thu cũ lên đời</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('col-md-6', 'pe-2')}>
              <div className={cx('d-lex', 'align-items-center', 'cs-old-new-btn-hover', 'cs-old-new-btn')}>
                <div className={cx('cs-cursor-link', 'text-center', 'py-1')}>
                  <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-medium', 'text-danger', 'cs-old-new-top')}>27.990.000đ</p>
                  <p className={cx('my-0', 'd-flex', 'justify-content-center', 'fw-normal', 'text-decoration-line-through', 'cs-old-new-bot')}>33.990.000đ</p>
                </div>
              </div>
            </div>
          </div>
          {/* slide right */}
          <div className={cx('row', 'mb-3')}>
            <div className={cx('col-12')}>
              <div id="carouselExampleSlidesOnly" className={cx('carousel slide', 'cs-slide-right')} data-bs-ride="carousel">
                <div className="carousel-inner carousel-inner-right">
                  <div className={cx('carousel-item', 'cs-img-bl-right', 'active')}>
                    <img src={dataSlideRight[1]} className={cx('cs-img-right')} alt="..." />
                  </div>
                  {dataSlideRight.map((item, index) => {
                    return (
                      <div key={index} className={cx('carousel-item', 'cs-img-bl-right')}>
                        <img src={item} className={cx('cs-img-right')} alt="..." />
                      </div>
                    )
                  })}
                </div>
                <button className={cx('carousel-control-prev', 'justify-content-start')} type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon carousel-control-prev-icon-right" aria-hidden="true" />
                  <span className={cx('visually-hidden')}>Previous</span>
                </button>
                <button className={cx('carousel-control-next', 'justify-content-end')} type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
                  <span className="carousel-control-next-icon carousel-control-next-icon-right" aria-hidden="true" />
                  <span className={cx('visually-hidden')}>Next</span>
                </button>
              </div>
            </div>
          </div>
          {/* sale */}
          <div className={cx('row', 'mb-3')}>
            <div className={cx('col-md-12')}>
              <div className={cx('cs-prod-sale')}>
                <div className={cx('d-flex', 'align-items-center', 'cs-sale-title', 'p-2')}>
                  <FaGift className={cx('me-2', 'fs-4', 'mb-1', 'cs-text-danger')} />
                  <h5 className={cx('m-0', 'cs-text-danger', 'text-normal', 'cs-sale-size')}>Khuyến mãi</h5>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'p-2')}>
                  <span className={cx('me-2', 'cs-sale-stt')} >1</span>
                  <p className={cx('m-0', 'cs-size-desc')}>Giảm 1.000.000đ qua QR bank</p>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'p-2')}>
                  <span className={cx('me-2', 'cs-sale-stt')} >2</span>
                  <p className={cx('m-0', 'cs-size-desc')}>Trả góp 0% đến 12 tháng, 0đ trả trước qua Samsung Finance+</p>
                </div>
                <div className={cx('d-flex', 'align-items-start', 'p-2')}>
                  <span className={cx('me-2', 'cs-sale-stt')} >3</span>
                  <p className={cx('m-0', 'cs-size-desc')}>Giảm ngay 200K khi mua Samsung Fit 3 (không áp dụng cùng giảm giá qua galaxy gift, xem chi tiết sản phẩm và điều kiện áp dụng tại đây)</p>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'p-2')}>
                  <span className={cx('me-2', 'cs-sale-stt')} >4</span>
                  <p className={cx('m-0', 'cs-size-desc')}>Quyền lợi bảo hành rơi vỡ rơi nước 12 tháng tại CellphoneS</p>
                </div>
              </div>
            </div>
          </div>
          <p className={cx('my-0', 'ps-1', 'fw-light', 'cs-sale-size', 'fst-italic', 'mb-2')}>Sản phẩm đang tạm hết hàng tại khu vực bạn đang chọn, vui lòng chuyển về <span className={cx('fw-medium', 'cs-sale-size')}>Bình Dương, Đồng Nai, Tiền Giang, Tây Ninh,</span> ... để đặt hàng online</p>
          {/* btn */}
          <div className={cx('row')}>
            <div className={cx('col-md-10', 'pe-1', 'mb-2')}>
              <button type="button" className={cx('btn btn-danger w-100', 'cs-hight-60')}>
                <p className={cx('m-0', 'cs-btn-size-16')}>MUA NGAY</p>
                <p className={cx('m-0', 'cs-btn-size-14')}>(Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)</p>
              </button>
            </div>
            <div className={cx('col-md-2', 'ps-1', 'mb-2')}>
              <button type="button" className={cx('btn btn-danger w-100', 'cs-hight-60', 'cs-btn-cart')}>
                <MdAddShoppingCart className={cx('cs-icon-cart')} />
                <p className={cx('m-0', 'cs-btn-text-cart')}>Thêm vào giỏ</p>
              </button>
            </div>
            <div className={cx('col-md-6', 'pe-1', 'mb-2')}>
              <button type="button" className={cx('btn btn-primary w-100', 'cs-hight-60')}>
                <p className={cx('m-0', 'cs-btn-size-14')}>TRẢ GÓP 0%</p>
                <p className={cx('m-0', 'cs-btn-size-12')}>Trả trước chỉ từ 0đ</p>
              </button>
            </div>
            <div className={cx('col-md-6', 'ps-1', 'mb-2')}>
              <button type="button" className={cx('btn btn-primary w-100', 'cs-hight-60')}>
                <p className={cx('m-0', 'cs-btn-size-14')}>TRẢ GÓP 0% QUA THẺ</p>
                <p className={cx('m-0', 'cs-btn-size-12')}>(Không phí chuyển đổi 3 - 6 tháng)</p>
              </button>
            </div>
            <div className={cx('col-md-12', 'mb-3')}>
              <button type="button" className={cx('btn btn-warning w-100', 'cs-hight-60', 'cs-btn-warning')}>
                <p className={cx('m-0', 'cs-btn-size-14')}>Thu cũ lên đời</p>
                <p className={cx('m-0', 'cs-btn-size-12')}>Chỉ từ 27.000.000đ</p>
              </button>
            </div>
          </div>
          {/* uu dai */}
          <div className={cx('row', 'mb-3', 'bl-UuDai')}>
            <div className={cx('col-md-12')}>
              <div className={cx('cs-prod-sale')}>
                <div className={cx('d-flex', 'align-items-center', 'cs-sale-title', 'p-2')}>
                  {/* <FaGift className={cx('me-2', 'fs-4', 'mb-1', 'cs-text-danger')} /> */}
                  <h5 className={cx('m-0', 'cs-text-danger', 'text-normal', 'cs-sale-size')}>ƯU ĐÃI THÊM</h5>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'p-2')}>
                  <span className={cx('me-2', 'cs-sale-stt')} >1</span>
                  <p className={cx('m-0', 'cs-size-desc')}>Giảm 1.000.000đ qua QR bank</p>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'p-2')}>
                  <span className={cx('me-2', 'cs-sale-stt')} >2</span>
                  <p className={cx('m-0', 'cs-size-desc')}>Trả góp 0% đến 12 tháng, 0đ trả trước qua Samsung Finance+</p>
                </div>
                <div className={cx('d-flex', 'align-items-start', 'p-2')}>
                  <span className={cx('me-2', 'cs-sale-stt')} >3</span>
                  <p className={cx('m-0', 'cs-size-desc')}>Giảm ngay 200K khi mua Samsung Fit 3 (không áp dụng cùng giảm giá qua galaxy gift, xem chi tiết sản phẩm và điều kiện áp dụng tại đây)</p>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'p-2')}>
                  <span className={cx('me-2', 'cs-sale-stt')} >4</span>
                  <p className={cx('m-0', 'cs-size-desc')}>Quyền lợi bảo hành rơi vỡ rơi nước 12 tháng tại CellphoneS</p>
                </div>
              </div>
            </div>
          </div>
          {/* security */}
          <div className={cx('row', 'mb-3')}>
            <div className={cx('col-md-12')}>
              <div className={cx('cs-security')}>
                <div className={cx('bl-1', 'p-2')}>
                  <GoShieldCheck className={cx('cs-icon')} />
                  <div className={cx('cs-desc')}>
                    <p className={cx('cs-desc-size-16', 'fw-medium', 'mb-2')}>Bảo vệ sản phẩm toàn diện với dịch vụ bảo hành mở rộng <Link className={cx('text-danger', 'cs-desc-size-12', 'text-decoration-underline')}>Xem chi tiết</Link></p>
                    <p className={cx('cs-desc-size-12', 'fw-light')}>(Khách hàng đăng ký thông tin để được hỗ trợ tư vấn và thanh toán tại cửa hàng nhanh nhất, số tiền phải thanh toán chưa bao gồm giá trị của gói bảo hành mở rộng)</p>
                  </div>
                </div>
                <div className={cx('bl-2', 'p-2', 'cs-cursor', 'pb-0')}>
                  <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault1">
                    <div className="form-check">
                      <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                      <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault1">
                        <p className={cx('m-0', 'cs-cursor')}>Gói 1 năm bảo hành Samsung Care+</p>
                        <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                          <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>2.029.000 đ</p>
                          <Link className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'cs-text-decoration')}>xem chi tiết</Link>
                        </div>
                      </label>
                    </div>
                  </label>
                </div>
                <div className={cx('bl-2', 'p-2', 'cs-cursor', 'pb-0')}>
                  <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault2">
                    <div className="form-check">
                      <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                      <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault2">
                        <p className={cx('m-0', 'cs-cursor')}>Rơi vỡ - Rớt nước: Hỗ trợ 90% chi phí sửa chữa, đổi mới sản phẩm nếu hư hỏng nặng trong 12 tháng</p>
                        <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                          <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>2.400.000 đ</p>
                          <Link className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'text-decoration-none')}>xem chi tiết</Link>
                        </div>
                      </label>
                    </div>
                  </label>
                </div>
                <div className={cx('bl-2', 'p-2', 'cs-cursor', 'pb-0')}>
                  <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault3">
                    <div className="form-check">
                      <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                      <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault3">
                        <p className={cx('m-0', 'cs-cursor')}>Gói 2 năm bảo hành Samsung Care+</p>
                        <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                          <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>3.399.000 đ</p>
                          <Link className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'text-decoration-none')}>xem chi tiết</Link>
                        </div>
                      </label>
                    </div>
                  </label>
                </div>
                <div className={cx('bl-2', 'p-2', 'cs-cursor', 'pb-0')}>
                  <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault4">
                    <div className="form-check">
                      <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                      <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault4">
                        <p className={cx('m-0', 'cs-cursor')}>Gói 6 tháng bảo hành Samsung Care+</p>
                        <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                          <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>1.299.000 đ</p>
                          <Link className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'text-decoration-none')}>xem chi tiết</Link>
                        </div>
                      </label>
                    </div>
                  </label>
                </div>
                <div className={cx('bl-2', 'p-2', 'cs-cursor', 'pb-0')}>
                  <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault5">
                    <div className="form-check">
                      <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault5" />
                      <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault5">
                        <p className={cx('m-0', 'cs-cursor')}>1 đổi 1 VIP 6 tháng: Đổi máy mới tương đương khi có lỗi từ NSX trong 6 tháng</p>
                        <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                          <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>1.300.000 đ</p>
                          <Link className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'text-decoration-none')}>xem chi tiết</Link>
                        </div>
                      </label>
                    </div>
                  </label>
                </div>
                <div className={cx('bl-2', 'p-2', 'cs-cursor', 'pb-0')}>
                  <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault6">
                    <div className="form-check">
                      <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault6" />
                      <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault6">
                        <p className={cx('m-0', 'cs-cursor')}>S24+ 12 tháng: Đổi sản phẩm tương đương hoặc miễn phí chi phí sửa chữa nếu có lỗi của NSX khi hết hạn bảo hành trong 12 tháng</p>
                        <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                          <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>1.600.000 đ</p>
                          <Link className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'text-decoration-none')}>xem chi tiết</Link>
                        </div>
                      </label>
                    </div>
                  </label>
                </div>
                <div className={cx('bl-2', 'p-2', 'cs-cursor')}>
                  <label className={cx('cs-border', 'p-2', 'cs-cursor')} htmlFor="flexRadioDefault7">
                    <div className="form-check">
                      <input className={cx('form-check-input', 'cs-cursor')} type="radio" name="flexRadioDefault" id="flexRadioDefault7" />
                      <label className={cx('form-check-label', 'fw-light', 'w-100')} htmlFor="flexRadioDefault7">
                        <p className={cx('m-0', 'cs-cursor')}>1 đổi 1 VIP 12 tháng: Đổi máy mới tương đương khi có lỗi từ NSX trong 12 tháng</p>
                        <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'cs-cursor')}>
                          <p className={cx('m-0', 'cs-cursor', 'fw-medium', 'text-danger')}>1.800.000 đ</p>
                          <Link className={cx('m-0', 'fst-italic', 'fw-light', 'text-danger', 'text-decoration-none')}>xem chi tiết</Link>
                        </div>
                      </label>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* assessment */}
          <div className={cx('row', 'mb-3')}>
            <div className={cx('col-md-12')}>
              <div className={cx('p-0', 'cs-assessment', 'mb-2')}>
                <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-3', 'pt-3', 'pb-3')}>Đánh giá & nhận xét {product?.title}</h5>
                <div className={cx('row', 'mx-3', 'mb-3', 'pb-3', 'cs-border-bottom')}>
                  <div className={cx('col-md-4', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'cs-border-right')}>
                    <h4>4.9/5</h4>
                    <p className={cx('d-flex', 'align-items-center')}>
                      <FaStar className={cx('text-warning', 'me-2')} />
                      <FaStar className={cx('text-warning', 'me-2')} />
                      <FaStar className={cx('text-warning', 'me-2')} />
                      <FaStar className={cx('text-warning', 'me-2')} />
                      <FaStar className={cx('text-warning', 'me-2')} />
                    </p>
                    <p className={cx('text-primary', 'text-decoration-underline')}>30 đánh giá</p>
                  </div>
                  <div className={cx('col-md-8', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center')}>
                    <p className={cx('d-flex', 'align-items-center', 'w-100', 'px-4')}>
                      <span className={cx('fw-medium')}>5</span>
                      <FaStar className={cx('text-warning', 'mx-1')} />
                      <div className={cx('progress', 'cs-progresbar')} role="progressbar" aria-label="Basic example" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-danger" style={{ width: '90%' }} />
                      </div>
                    </p>
                    <p className={cx('d-flex', 'align-items-center', 'w-100', 'px-4')}>
                      <span className={cx('fw-medium')}>4</span>
                      <FaStar className={cx('text-warning', 'mx-1')} />
                      <div className={cx('progress', 'cs-progresbar')} role="progressbar" aria-label="Basic example" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-danger" style={{ width: '80%' }} />
                      </div>
                    </p>
                    <p className={cx('d-flex', 'align-items-center', 'w-100', 'px-4')}>
                      <span className={cx('fw-medium')}>3</span>
                      <FaStar className={cx('text-warning', 'mx-1')} />
                      <div className={cx('progress', 'cs-progresbar')} role="progressbar" aria-label="Basic example" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-danger" style={{ width: '15%' }} />
                      </div>
                    </p>
                    <p className={cx('d-flex', 'align-items-center', 'w-100', 'px-4')}>
                      <span className={cx('fw-medium')}>2</span>
                      <FaStar className={cx('text-warning', 'mx-1')} />
                      <div className={cx('progress', 'cs-progresbar')} role="progressbar" aria-label="Basic example" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-danger" style={{ width: '10%' }} />
                      </div>
                    </p>
                    <p className={cx('d-flex', 'align-items-center', 'w-100', 'px-4')}>
                      <span className={cx('fw-medium')}>1</span>
                      <FaStar className={cx('text-warning', 'mx-1')} />
                      <div className={cx('progress', 'cs-progresbar')} role="progressbar" aria-label="Basic example" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-danger" style={{ width: '5%' }} />
                      </div>
                    </p>
                  </div>
                </div>
                {/*  */}
                <div className={cx('row', 'mx-3', 'mb-3', 'pb-3', 'cs-border-bottom')}>
                  <h4 className={cx('cs-tech-size-14', 'fs-5', 'px-3', 'pt-3', 'pb-3')}>Đánh giá theo trải nghiệm</h4>
                  <div className={cx('col-md-12', 'd-flex', 'align-items-center', 'justify-content-between', 'cs-height')}>
                    <p className={cx('fw-light')}>Hiệu năng</p>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-center')}>
                      <p className={cx('d-flex', 'align-items-center')}>
                        <FaStar className={cx('text-warning', 'me-2')} />
                        <FaStar className={cx('text-warning', 'me-2')} />
                        <FaStar className={cx('text-warning', 'me-2')} />
                        <FaStar className={cx('text-warning', 'me-2')} />
                        <FaStar className={cx('text-warning', 'me-2')} />
                      </p>
                      <span className={cx('cs-star', 'ms-1')}>
                        <p className={cx('fw-normal')}>5/5</p>
                        <p className={cx('fw-light')}>(27)</p>
                      </span>
                    </div>
                  </div>
                  <div className={cx('col-md-12', 'd-flex', 'align-items-center', 'justify-content-between', 'cs-height')}>
                    <p className={cx('fw-light')}>Thời lượng pin</p>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-center')}>
                      <p className={cx('d-flex', 'align-items-center')}>
                        <FaStar className={cx('text-warning', 'me-2')} />
                        <FaStar className={cx('text-warning', 'me-2')} />
                        <FaStar className={cx('text-warning', 'me-2')} />
                        <FaStar className={cx('text-warning', 'me-2')} />
                        <FaStar className={cx('text-warning', 'me-2')} />
                      </p>
                      <span className={cx('cs-star', 'ms-1')}>
                        <p className={cx('fw-normal')}>5/5</p>
                        <p className={cx('fw-light')}>(27)</p>
                      </span>
                    </div>
                  </div>
                  <div className={cx('col-md-12', 'd-flex', 'align-items-center', 'justify-content-between', 'cs-height')}>
                    <p className={cx('fw-light')}>Chất lượng camera</p>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-center')}>
                      <p className={cx('d-flex', 'align-items-center')}>
                        <FaStar className={cx('text-warning', 'me-2')} />
                        <FaStar className={cx('text-warning', 'me-2')} />
                        <FaStar className={cx('text-warning', 'me-2')} />
                        <FaStar className={cx('text-warning', 'me-2')} />
                        <FaStar className={cx('text-warning', 'me-2')} />
                      </p>
                      <span className={cx('cs-star', 'ms-1')}>
                        <p className={cx('fw-normal')}>4.5/5</p>
                        <p className={cx('fw-light')}>(20)</p>
                      </span>
                    </div>
                  </div>
                </div>
                {/* btn assessment */}
                <div className={cx('row', 'mx-3', 'mb-2', 'pb-3', 'cs-border-bottom', 'd-flex', 'flex-column', 'align-items-center')}>
                  <p className={cx('cs-tech-size-15', 'fw-light', 'd-flex', 'justify-content-center')}>Bạn giá sao về sản phẩm này?</p>
                  <button type="button" className={cx('btn btn-danger', 'w-25')}>Đánh giá ngay</button>
                </div>
                {/* filter */}
                <div className={cx('row', 'mx-3', 'mb-3', 'pb-3')}>
                  <h4 className={cx('cs-tech-size-14', 'fs-5', 'px-3', 'pt-3', 'pb-2')}>Lọc theo</h4>
                  <div className={cx('d-flex', 'mb-2')}>
                    <div className={cx('cs-filter', 'cs-filter-active')}>Tất cả</div>
                    <div className={cx('cs-filter')}>Có hình ảnh</div>
                    <div className={cx('cs-filter')}>Đã mua hàng</div>
                  </div>
                  <div className={cx('d-flex')}>
                    <div className={cx('cs-filter')}>1<FaStar className={cx('text-warning', 'ms-1', 'mb-1')} /></div>
                    <div className={cx('cs-filter')}>2<FaStar className={cx('text-warning', 'ms-1', 'mb-1')} /></div>
                    <div className={cx('cs-filter')}>3<FaStar className={cx('text-warning', 'ms-1', 'mb-1')} /></div>
                    <div className={cx('cs-filter')}>4<FaStar className={cx('text-warning', 'ms-1', 'mb-1')} /></div>
                    <div className={cx('cs-filter')}>5<FaStar className={cx('text-warning', 'ms-1', 'mb-1')} /></div>
                  </div>
                </div >
                {/* user assessment */}
                <div className={cx('row', 'mx-3', 'mb-2', 'pb-2', 'cs-border-bottom')}>
                  <div className={cx('cs-user-assess')}>
                    <div className={cx('img', 'me-3')}>P</div>
                    <div className={cx('d-flex', 'flex-column')}>
                      <h5 className={cx('cs-tech-size-15', 'm-0', 'd-flex', 'align-items-center', 'py-2', 'mb-2')}>Phạm thuý vy</h5>
                      <h5 className={cx('cs-tech-size-15', 'm-0', 'fw-light', 'mb-2', 'd-flex')}>
                        <p className={cx('d-flex', 'align-items-center', 'm-0', 'me-2', 'py-1', 'pe-1', 'cs-border-right')}>
                          <FaStar className={cx('text-warning')} />
                          <FaStar className={cx('text-warning')} />
                          <FaStar className={cx('text-warning')} />
                          <FaStar className={cx('text-warning')} />
                          <FaStar className={cx('text-warning')} />
                        </p>
                        <div className={cx('cs-option', 'me-1')}>Hiệu năng Siêu mạnh</div>
                        <div className={cx('cs-option', 'me-1')}>Thời lượng pin khủng</div>
                      </h5>
                      <h5 className={cx('cs-tech-size-12', 'm-0', 'fw-light', 'py-2')}>E muốn trả góp 6 tháng nhưng nếu trong 6 tháng e trả trước hạn thì có được không</h5>
                    </div>
                  </div>
                </div>
                <div className={cx('row', 'mx-3', 'mb-2', 'pb-2', 'cs-border-bottom')}>
                  <div className={cx('cs-user-assess')}>
                    <div className={cx('img', 'me-3')}>P</div>
                    <div className={cx('d-flex', 'flex-column')}>
                      <h5 className={cx('cs-tech-size-15', 'm-0', 'd-flex', 'align-items-center', 'py-2', 'mb-2')}>Phạm thuý vy</h5>
                      <h5 className={cx('cs-tech-size-15', 'm-0', 'fw-light', 'mb-2', 'd-flex')}>
                        <p className={cx('d-flex', 'align-items-center', 'm-0', 'me-2', 'py-1', 'pe-1', 'cs-border-right')}>
                          <FaStar className={cx('text-warning')} />
                          <FaStar className={cx('text-warning')} />
                          <FaStar className={cx('text-warning')} />
                          <FaStar className={cx('text-warning')} />
                          <FaStar className={cx('text-warning')} />
                        </p>
                        <div className={cx('cs-option', 'me-1')}>Hiệu năng Siêu mạnh</div>
                        <div className={cx('cs-option', 'me-1')}>Thời lượng pin khủng</div>
                      </h5>
                      <h5 className={cx('cs-tech-size-12', 'm-0', 'fw-light', 'py-2')}>E muốn trả góp 6 tháng nhưng nếu trong 6 tháng e trả trước hạn thì có được không</h5>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className={cx('row', 'mb-2')}>
                  <button type="button" className="btn btn-link">Xem thêm đánh giá</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      {/* assessment */}
      <div className={cx('row', 'mb-2')}>
        <div className={cx('col-md-8', 'mb-2')}>
          <div className={cx('p-0', 'cs-assessment', 'mb-2')}>
          </div >
        </div >
        <div className={cx('col-md-4', 'mb-2')}>
          <div className={cx('p-0', 'cs-assessment', 'mb-2')}>
            {/* <Specifications /> */}
          </div >
        </div >
      </div >

    </div >
  )
}

export default HomeDetail
