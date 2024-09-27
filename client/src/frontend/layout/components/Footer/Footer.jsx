import LogoIcon from '../../../components/LogoIcon/LogoIcon'
import './Footer.css'


const Footer = () => {
  return (
    <footer className='cs-wrapper'>
      <div className='container pt-3'>
        <div className='row'>
          {/* block 1 */}
          <div className='col-3'>
            <div className='gl-mb-12'>
              <div className='gl-fz-16 gl-mb-12 fw-normal'>Tổng đài hỗ trợ miễn phí</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Gọi mua hàng <strong className='gl-fz-12'>+84 971955144</strong> (7h30 - 22h00)</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Gọi khiếu nại <strong className='gl-fz-12'>+84 971955144</strong> (8h00 - 21h30)</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Gọi bảo hành <strong className='gl-fz-12'>+84 971955144</strong> (8h00 - 21h00)</div>
            </div>
            <div className='gl-mb-12'>
              <div className='gl-fz-16 gl-mb-12 fw-normal'>Phương thức thanh toán</div>
              <div className='d-flex flex-wrap'>
                <a className='cs-img-pay' href='#'><img className='cs-img' src='https://cdn2.cellphones.com.vn/x35,webp/media/wysiwyg/apple-pay-og.png' alt=''/></a>
                <a className='cs-img-pay' href='#'><img className='cs-img' src='https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/vnpay-logo.png' alt=''/></a>
                <a className='cs-img-pay' href='#'><img className='cs-img' src='https://cdn2.cellphones.com.vn/x/media/wysiwyg/momo_1.png' alt=''/></a>
                <a className='cs-img-pay' href='#'><img className='cs-img' src='https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/onepay-logo.png' alt=''/></a>
                <a className='cs-img-pay' href='#'><img className='cs-img' src='https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/mpos-logo.png' alt=''/></a>
                <a className='cs-img-pay' href='#'><img className='cs-img' src='https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/kredivo-logo.png' alt=''/></a>
                <a className='cs-img-pay' href='#'><img className='cs-img' src='https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/zalopay-logo.png' alt=''/></a>
                <a className='cs-img-pay' href='#'><img className='cs-img' src='https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/alepay-logo.png' alt=''/></a>
                <a className='cs-img-pay' href='#'><img className='cs-img' src='https://cdn2.cellphones.com.vn/x/media/wysiwyg/fundiin.png' alt=''/></a>
              </div>
            </div>
            <div className='gl-mb-12'>
              <div className='gl-fz-16 gl-mb-5 fw-normal'>ĐĂNG KÝ NHẬN TIN KHUYẾN MÃI</div>
              <div className='gl-fz-14 gl-mb-5 fw-normal gl-color-white-4a text-danger'>(*) Nhận ngay voucher 10%</div>
              <div className='gl-fz-13 gl-mb-10 fw-normal gl-color-white-4a text-black'>*Voucher sẽ được gửi sau 24h, chỉ áp dụng cho khách hàng mới</div>
              <div className="mb-3">
                <input type="email" className="cs-input" id="emailFooter" placeholder='Email *'/>
              </div>
              <div className="gl-mb-10">
                <input type="text" className="cs-input" id="phone" placeholder='Phone number'/>
              </div>
              <div className="gl-mb-10 form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                <label className="form-check-label gl-fz-13 gl-mb-5 fw-normal gl-color-white-4a text-danger" htmlFor="flexCheckChecked">
                  Tôi đồng ý với điều khoản của CellphoneS
                </label>
              </div>
              <button type="button" className="btn btn-danger w-100 gl-bg-primary">ĐĂNG KÝ NGAY</button>
            </div>
          </div>
          {/* block 2 */}
          <div className='col-3'>
            <div className='gl-mb-12'>
              <div className='gl-fz-16 gl-mb-12 fw-normal'>Thông tin và chính sách</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Mua hàng và thanh toán Online</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Mua hàng trả góp Online</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Mua hàng trả góp bằng thẻ tín dụng</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Chính sách giao hàng</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Tra điểm Smember</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Xem ưu đãi Smember</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Tra thông tin bảo hành</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Tra cứu hoá đơn điện tử</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Thông tin hoá đơn mua hàng</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Trung tâm bảo hành chính hãng</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Quy định về việc sao lưu dữ liệu</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Chính sách khui hộp sản phẩm Apple</div>
            </div>
          </div>
          {/* block 3 */}
          <div className='col-3'>
            <div className='gl-mb-12'>
              <div className='gl-fz-16 gl-mb-12 fw-normal'>Dịch vụ và thông tin khác</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Khách hàng doanh nghiệp (B2B)</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Ưu đãi thanh toán</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Quy chế hoạt động</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Chính sách bảo mật thông tin cá nhân</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Chính sách Bảo hành</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Liên hệ hợp tác kinh doanh</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Tuyển dụng</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Dịch vụ bảo hành mở rộng</div>
              <div className='gl-fz-12 gl-mb-5 ms-2 fw-normal gl-color-white-4a d-flex align-items-center'><LogoIcon/> Smember: Tích điểm & sử dụng ưu đãi</div>
              <div className='gl-mb-5 ms-2 d-flex align-items-center'>
                <div className=''>
                  <a className='cs-qr' href='#'><img className='cs-qr-img' src='https://cdn2.cellphones.com.vn/200x,webp/media/wysiwyg/QR_appGeneral.jpg' alt=''/></a>
                </div>
                <div className='d-flex flex-column justify-content-between'>
                  <a href='#'><img className='cs-down-app my-2 ms-2' src='https://cdn2.cellphones.com.vn/200x,webp/media/wysiwyg/downloadANDROID.png' alt=''/></a>
                  <a href='#'><img className='cs-down-app my-2 ms-2' src='https://cdn2.cellphones.com.vn/200x,webp/media/wysiwyg/downloadiOS.png' alt=''/></a>
                </div>
              </div>
            </div>
          </div>
          {/* block 4 */}
          <div className='col-3 pe-0'>
            <div className='gl-mb-12'>
              <div className='gl-fz-16 gl-mb-12 fw-normal'>Kết nối với Ecommerce</div>
              <div className='d-flex flex-wrap'>
                <a className='cs-social' href='#'><img className='cs-social-img' src='https://cdn2.cellphones.com.vn/44x,webp/media/logo/social/cellphones-youtube.png' alt=''/></a>
                <a className='cs-social' href='#'><img className='cs-social-img' src='https://cdn2.cellphones.com.vn/44x,webp/media/logo/social/cellphones-facebook.png' alt=''/></a>
                <a className='cs-social' href='#'><img className='cs-social-img' src='https://cdn2.cellphones.com.vn/44x,webp/media/logo/social/cellphones-instagram.png' alt=''/></a>
                <a className='cs-social' href='#'><img className='cs-social-img' src='https://cdn2.cellphones.com.vn/44x,webp/media/logo/social/cellphones-tiktok.png' alt=''/></a>
                <a className='cs-social' href='#'><img className='cs-social-img' src='https://cdn2.cellphones.com.vn/44x,webp/media/logo/social/cellphones-zalo.png' alt=''/></a>
              </div>
            </div>
            <div className='gl-mb-12'>
              <div className='gl-fz-16 gl-mb-12 fw-normal'>Website thành viên</div>
              <div className='gl-mb-5'>
                <div className='gl-fz-12 gl-mb-5 fw-normal gl-color-white-4a'>Hệ thống bảo hành sửa chữa Điện thoại - Máy tính</div>
                <a className='cs-banner' href='#'><img className='cs-banner-img' src='https://cdn2.cellphones.com.vn/x30,webp/media/logo/corp-members/dienthoaivui.png' alt=''/></a>
              </div>
              <div className='gl-mb-5'>
                <div className='gl-fz-12 gl-mb-5 fw-normal gl-color-white-4a'>Trung tâm bảo hành uỷ quyền Apple</div>
                <a className='cs-banner' href='#'><img className='cs-banner-img' src='https://cdn2.cellphones.com.vn/x/media/wysiwyg/Logo_CareS_1.png' alt=''/></a>
              </div>
              <div className='gl-mb-5'>
                <div className='gl-fz-12 gl-mb-5 fw-normal gl-color-white-4a'>Kênh thông tin giải trí công nghệ cho giới trẻ</div>
                <a className='cs-banner' href='#'><img className='cs-banner-img' src='https://cdn2.cellphones.com.vn/x30,webp/media/logo/corp-members/schanel.png' alt=''/></a>
              </div>
              <div className='gl-mb-5'>
                <div className='gl-fz-12 gl-mb-5 fw-normal gl-color-white-4a'>Trang thông tin công nghệ mới nhất</div>
                <a className='cs-banner' href='#'><img className='cs-banner-img' src='https://cdn2.cellphones.com.vn/x30,webp/media/logo/corp-members/sforum.png' alt=''/></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-100 gl-bg-white-1 py-3'>
        <div className='container'>
          <div className='row'>
            <div className='col-3'>
              <div className='gl-mb-12'>
                <div className='gl-fz-10 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Điện thoại iPhone 16 Pro  – Điện thoại iPhone 16 Pro Max</div>
                <div className='gl-fz-10 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Điện thoại iPhone 15  – Điện thoại iPhone 15 Pro Max</div>
              </div>
            </div>
            <div className='col-3'>
              <div className='gl-mb-12'>
                <div className='gl-fz-10 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Điện thoại  – Điện thoại iPhone  – Điện thoại Xiaomi</div>
                <div className='gl-fz-10 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Điện thoại Samsung Galaxy  – Điện thoại OPPO</div>
              </div>
            </div>
            <div className='col-3'>
              <div className='gl-mb-12'>
                <div className='gl-fz-10 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Laptop  – Laptop Acer  – Laptop Dell  – Laptop HP</div>
                <div className='gl-fz-10 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Tivi  – Tivi Samsung  – Tivi Sony  – Tivi LG</div>
              </div>
            </div>
            <div className='col-3'>
              <div className='gl-mb-12'>
                <div className='gl-fz-10 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Đồ gia dụng  – Máy hút bụi gia đình</div>
                <div className='gl-fz-10 gl-mb-5 ms-2 fw-normal gl-color-white-4a'>Laptop AI  – Back to School là gì</div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center gl-fz-10 gl-mb-5 fw-normal gl-color-white-92'>Công ty TNHH Thương Mại và Dịch Vụ Kỹ Thuật DIỆU PHÚC - GPĐKKD: 0316172372 cấp tại Sở KH & ĐT TP. HCM. Địa chỉ văn phòng: 350-352 Võ Văn Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh, Việt Nam. Điện thoại: 028.7108.9666.</div>
          <div className='d-flex justify-content-center align-items-center mb-3'>
            <a className='cs-banner' href='#'><img className='cs-banner-img' src='https://cdn2.cellphones.com.vn/80x,webp/media/logo/logoSaleNoti.png' alt=''/></a>
            <a className='cs-copyright' href='#'><img className='cs-copyright-img' src='https://images.dmca.com/Badges/dmca_copyright_protected150c.png?ID=158f5667-cce3-4a18-b2d1-826225e6b022' alt=''/></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
