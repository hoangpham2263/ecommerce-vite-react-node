import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'

const cx = classNames.bind(styles)

const Specifications = () => {
  return (
    <span>
      <h5 className={cx('fw-medium', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Thông số kỹ thuật</h5>
      <div className={cx('row', 'mb-2')}>
        <div className={cx('col-md-6', 'mb-2')}>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Màn hình</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Kích thước màn hình</td>
                  <td className={cx('fw-light')}>6.8 inches</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Công nghệ màn hình</td>
                  <td className={cx('fw-light')}>Dynamic AMOLED 2X</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Độ phân giải màn hình</td>
                  <td className={cx('fw-light')}>1440 x 3120 pixels</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Tính năng màn hình</td>
                  <td className={cx('fw-light')}>Độ sáng cao nhất 2,600 nits, 120Hz, Corning® Gorilla® Armor®, 16 triệu màu</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Tần số quét</td>
                  <td className={cx('fw-light')}>120Hz</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Kiểu màn hình</td>
                  <td className={cx('fw-light')}>Đục lỗ (Nốt ruồi)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Camera trước</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Camera trước</td>
                  <td className={cx('fw-light')}>12 MP, f/2.2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Vi xử lý & đồ họa</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Chipset</td>
                  <td className={cx('fw-light')}>Snapdragon 8 Gen 3 For Galaxy</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>GPU</td>
                  <td className={cx('fw-light')}>Adreno 750 (1 GHz)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Giao tiếp & kết nối</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Công nghệ NFC</td>
                  <td className={cx('fw-light')}>Có</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Thẻ SIM</td>
                  <td className={cx('fw-light')}>SIM 1 + SIM 2 / SIM 1 + eSIM / 2 eSIM</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Hỗ trợ mạng</td>
                  <td className={cx('fw-light')}>5G</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>GPS</td>
                  <td className={cx('fw-light')}>GPS, Glonass, Beidou, Galileo, QZSS</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>RAM & lưu trữ</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Dung lượng RAM</td>
                  <td className={cx('fw-light')}>12 GB</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Bộ nhớ trong</td>
                  <td className={cx('fw-light')}>256 GB</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Khe cắm thẻ nhớ</td>
                  <td className={cx('fw-light')}>Không hỗ trợ</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Pin & công nghệ sạc</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Pin</td>
                  <td className={cx('fw-light')}>5,000mAh</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Công nghệ sạc</td>
                  <td className={cx('fw-light')}>Sạc nhanh 45W, Chia sẻ pin không dây, Sạc siêu nhanh, Sạc không dây</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Cổng sạc</td>
                  <td className={cx('fw-light')}>USB Type-C</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Tiện ích khác</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Cảm biến vân tay</td>
                  <td className={cx('fw-light')}>Cảm biến vân tay trong màn hình</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Các loại cảm biến</td>
                  <td className={cx('fw-light')}>Cảm biến gia tốc, Cảm biến tiệm cận, Cảm biến ánh sáng, La bàn, Con quay hồi chuyển, Cảm biến áp kế, Cảm biến trọng lực</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Tính năng đặc biệt</td>
                  <td className={cx('fw-light')}>Hỗ trợ 5G, Bảo mật vân tay, Nhận diện khuôn mặt, Kháng nước, kháng bụi, Điện thoại AI, Đi kèm bút cảm ứng</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Cổng kết nối</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Wi-Fi</td>
                  <td className={cx('fw-light')}>802.11a/b/g/n/ac/ax/be 2.4GHz+5GHz+6GHz, EHT320, MIMO, 4096-QAM</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Bluetooth</td>
                  <td className={cx('fw-light')}>v5.3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={cx('col-md-6', 'mb-2')}>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Camera sau</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="col" className={cx('fw-light')}>Camera sau</th>
                  <th scope="col" className={cx('fw-light')}>
                    <p className={cx('mb-1')}>Camera chính: 200MP, Laser AF, OIS</p>
                    <p className={cx('mb-1')}>Camera: 50MP, PDAF, OIS, zoom quang học 5x</p>
                    <p className={cx('mb-1')}>Camera tele: 10MP</p>
                    <p className={cx('mb-1')}>Camera góc siêu rộng: 12 MP, f/2.2, 13mm, 120˚</p>
                  </th>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Quay video</td>
                  <td className={cx('fw-light')}>8K@24/30fps, 4K@30/60/120fps, 1080p@30/60/240fps, 1080p@960fps</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Tính năng camera</td>
                  <td className={cx('fw-light')}>
                    <p className={cx('mb-1')}>Trợ lí Chỉnh ảnh (Gợi ý chỉnh sửa, Hậu kì sáng tạo)</p>
                    <p className={cx('mb-1')}>Chụp đêm Nightography</p>
                    <p className={cx('mb-1')}>Chế độ Super HDR</p>
                    <p className={cx('mb-1')}>Chụp hình & quay phim với Portrait AI</p>
                    <p className={cx('mb-1')}>Chống rung quang học OIS & Chống rung kỹ thuật số AI VDIS</p>
                    <p className={cx('mb-1')}>Zoom kĩ thuật số 100x, Zoom quang học 3x & 10xCh</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Tính năng khác</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Hệ điều hành</td>
                  <td className={cx('fw-light')}>Android 14, One UI 6.1</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Bộ xử lý & Đồ họa</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Loại CPU</td>
                  <td className={cx('fw-light')}>3.39GHz,3.1GHz,2.9GHz,2.2GHz</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Kích thước & Trọng lượng</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Kích thước</td>
                  <td className={cx('fw-light')}>162.3 x 79.0 x 8.6mm</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Trọng lượng</td>
                  <td className={cx('fw-light')}>232g</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Thiết kế & Trọng lượng</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Chất liệu mặt lưng</td>
                  <td className={cx('fw-light')}>Kính</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Chất liệu khung viền</td>
                  <td className={cx('fw-light')}>Titanium</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Thông số khác</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Tương thích</td>
                  <td className={cx('fw-light')}>Bút SPEN - tích hợp sẵn lên máy</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Chỉ số kháng nước, bụi</td>
                  <td className={cx('fw-light')}>IP68</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Công nghệ - Tiện ích</td>
                  <td className={cx('fw-light')}>Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC), Chặn cuộc gọi, Chặn tin nhắn, Tối ưu game (Game Booster), Tối ưu hiển thị (Vision Booster), Samsung Wallet (Samsung Pay), Thu nhỏ màn hình sử dụng một tay, Không gian thứ hai (Thư mục bảo mật),</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Tiện ích khác</td>
                  <td className={cx('fw-light')}>Tính năng AI: Khoanh tròn để tìm kiếm, trợ lí note, Trợ lí chình ảnh chuyên nghiệp, Phiên dịch cuộc gọi trực tiếp Tiện ích trên màn hình khoá và Màn hình Always On Trợ lý chat thông minh</td>
                </tr>
                <tr>
                  <td className={cx('fw-light')}>Công nghệ âm thanh</td>
                  <td className={cx('fw-light')}>Âm thanh AKG, Âm thanh Dolby Atmos</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx('p-0', 'cs-technique', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-2', 'pt-3', 'pb-1')}>Thông tin chung</h5>
            <table className={cx('table table-striped', 'mb-0')}>
              <thead className={cx('d-none')}>
                <tr>
                  <th scope="col" className={cx('fw-light')}></th>
                  <th scope="col" className={cx('fw-light')}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cx('fw-light')}>Thời điểm ra mắt</td>
                  <td className={cx('fw-light')}>1/2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </span>
  )
}

export default Specifications
