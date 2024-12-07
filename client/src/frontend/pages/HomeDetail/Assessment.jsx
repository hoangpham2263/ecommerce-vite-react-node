import classNames from 'classnames/bind'
import styles from './HomeDetail.module.scss'
import { FaStar } from 'react-icons/fa'

const cx = classNames.bind(styles)

const Assessment = ({ product }) => {
  return (
    <span>
      <div className={cx('row', 'mb-3')}>
        <div className={cx('col-md-12')}>
          <div className={cx('p-0', 'cs-assessment', 'mb-2')}>
            <h5 className={cx('cs-tech-size-14', 'fs-5', 'px-3', 'pt-3', 'pb-3')}>Đánh giá & nhận xét {product?.title}</h5>
            <div className={cx('row', 'mx-3', 'mb-3', 'pb-3', 'cs-border-bottom')}>
              <div className={cx('col-md-4', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'cs-border-right')}>
                <h4>4.9/5</h4>
                <div className={cx('d-flex', 'align-items-center')}>
                  <FaStar className={cx('text-warning', 'me-2')} />
                  <FaStar className={cx('text-warning', 'me-2')} />
                  <FaStar className={cx('text-warning', 'me-2')} />
                  <FaStar className={cx('text-warning', 'me-2')} />
                  <FaStar className={cx('text-warning', 'me-2')} />
                </div>
                <p className={cx('text-primary', 'text-decoration-underline')}>30 đánh giá</p>
              </div>
              <div className={cx('col-md-8', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center')}>
                <div className={cx('d-flex', 'align-items-center', 'w-100', 'px-4')}>
                  <span className={cx('fw-medium')}>5</span>
                  <FaStar className={cx('text-warning', 'mx-1')} />
                  <div className={cx('progress', 'cs-progresbar')} role="progressbar" aria-label="Basic example" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-danger" style={{ width: '90%' }} />
                  </div>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'w-100', 'px-4')}>
                  <span className={cx('fw-medium')}>4</span>
                  <FaStar className={cx('text-warning', 'mx-1')} />
                  <div className={cx('progress', 'cs-progresbar')} role="progressbar" aria-label="Basic example" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-danger" style={{ width: '80%' }} />
                  </div>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'w-100', 'px-4')}>
                  <span className={cx('fw-medium')}>3</span>
                  <FaStar className={cx('text-warning', 'mx-1')} />
                  <div className={cx('progress', 'cs-progresbar')} role="progressbar" aria-label="Basic example" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-danger" style={{ width: '15%' }} />
                  </div>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'w-100', 'px-4')}>
                  <span className={cx('fw-medium')}>2</span>
                  <FaStar className={cx('text-warning', 'mx-1')} />
                  <div className={cx('progress', 'cs-progresbar')} role="progressbar" aria-label="Basic example" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-danger" style={{ width: '10%' }} />
                  </div>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'w-100', 'px-4')}>
                  <span className={cx('fw-medium')}>1</span>
                  <FaStar className={cx('text-warning', 'mx-1')} />
                  <div className={cx('progress', 'cs-progresbar')} role="progressbar" aria-label="Basic example" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-danger" style={{ width: '5%' }} />
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className={cx('row', 'mx-3', 'mb-3', 'pb-3', 'cs-border-bottom')}>
              <h4 className={cx('cs-tech-size-14', 'fs-5', 'px-3', 'pt-3', 'pb-3')}>Đánh giá theo trải nghiệm</h4>
              <div className={cx('col-md-12', 'd-flex', 'align-items-center', 'justify-content-between', 'cs-height')}>
                <p className={cx('fw-light')}>Hiệu năng</p>
                <div className={cx('d-flex', 'align-items-center', 'justify-content-center')}>
                  <div className={cx('d-flex', 'align-items-center')}>
                    <FaStar className={cx('text-warning', 'me-2')} />
                    <FaStar className={cx('text-warning', 'me-2')} />
                    <FaStar className={cx('text-warning', 'me-2')} />
                    <FaStar className={cx('text-warning', 'me-2')} />
                    <FaStar className={cx('text-warning', 'me-2')} />
                  </div>
                  <span className={cx('cs-star', 'ms-1')}>
                    <p className={cx('fw-normal')}>5/5</p>
                    <p className={cx('fw-light')}>(27)</p>
                  </span>
                </div>
              </div>
              <div className={cx('col-md-12', 'd-flex', 'align-items-center', 'justify-content-between', 'cs-height')}>
                <p className={cx('fw-light')}>Thời lượng pin</p>
                <div className={cx('d-flex', 'align-items-center', 'justify-content-center')}>
                  <div className={cx('d-flex', 'align-items-center')}>
                    <FaStar className={cx('text-warning', 'me-2')} />
                    <FaStar className={cx('text-warning', 'me-2')} />
                    <FaStar className={cx('text-warning', 'me-2')} />
                    <FaStar className={cx('text-warning', 'me-2')} />
                    <FaStar className={cx('text-warning', 'me-2')} />
                  </div>
                  <span className={cx('cs-star', 'ms-1')}>
                    <p className={cx('fw-normal')}>5/5</p>
                    <p className={cx('fw-light')}>(27)</p>
                  </span>
                </div>
              </div>
              <div className={cx('col-md-12', 'd-flex', 'align-items-center', 'justify-content-between', 'cs-height')}>
                <p className={cx('fw-light')}>Chất lượng camera</p>
                <div className={cx('d-flex', 'align-items-center', 'justify-content-center')}>
                  <div className={cx('d-flex', 'align-items-center')}>
                    <FaStar className={cx('text-warning', 'me-2')} />
                    <FaStar className={cx('text-warning', 'me-2')} />
                    <FaStar className={cx('text-warning', 'me-2')} />
                    <FaStar className={cx('text-warning', 'me-2')} />
                    <FaStar className={cx('text-warning', 'me-2')} />
                  </div>
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
                <div className={cx('img', 'me-3')}>H</div>
                <div className={cx('d-flex', 'flex-column')}>
                  <h5 className={cx('cs-tech-size-15', 'm-0', 'd-flex', 'align-items-center', 'py-2', 'mb-2')}>Phạm Quốc Hoàng</h5>
                  <h5 className={cx('cs-tech-size-15', 'm-0', 'fw-light', 'mb-2', 'd-flex')}>
                    <div className={cx('d-flex', 'align-items-center', 'm-0', 'me-2', 'py-1', 'pe-1', 'cs-border-right')}>
                      <FaStar className={cx('text-warning')} />
                      <FaStar className={cx('text-warning')} />
                      <FaStar className={cx('text-warning')} />
                      <FaStar className={cx('text-warning')} />
                      <FaStar className={cx('text-warning')} />
                    </div>
                    <div className={cx('cs-option', 'me-1')}>Hiệu năng Siêu mạnh</div>
                    <div className={cx('cs-option', 'me-1')}>Thời lượng pin khủng</div>
                  </h5>
                  <h5 className={cx('cs-tech-size-12', 'm-0', 'fw-light', 'py-2')}>E muốn trả góp 6 tháng nhưng nếu trong 6 tháng e trả trước hạn thì có được không</h5>
                </div>
              </div>
            </div>
            <div className={cx('row', 'mx-3', 'mb-2', 'pb-2', 'cs-border-bottom')}>
              <div className={cx('cs-user-assess')}>
                <div className={cx('img', 'me-3')}>H</div>
                <div className={cx('d-flex', 'flex-column')}>
                  <h5 className={cx('cs-tech-size-15', 'm-0', 'd-flex', 'align-items-center', 'py-2', 'mb-2')}>Phạm Quốc Hoàng</h5>
                  <h5 className={cx('cs-tech-size-15', 'm-0', 'fw-light', 'mb-2', 'd-flex')}>
                    <div className={cx('d-flex', 'align-items-center', 'm-0', 'me-2', 'py-1', 'pe-1', 'cs-border-right')}>
                      <FaStar className={cx('text-warning')} />
                      <FaStar className={cx('text-warning')} />
                      <FaStar className={cx('text-warning')} />
                      <FaStar className={cx('text-warning')} />
                      <FaStar className={cx('text-warning')} />
                    </div>
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
    </span>
  )
}

export default Assessment
