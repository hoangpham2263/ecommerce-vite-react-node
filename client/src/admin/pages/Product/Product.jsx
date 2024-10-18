import './Product.css'
import classNames from 'classnames/bind'
import styles from './Product.module.scss'
import { IoIosWarning } from 'react-icons/io'

const cx = classNames.bind(styles)

const Product = () => {
  const listItem = [1, 1, 1, 1, 1]
  return (
    <div className={cx('wrapper')}>
      <div className={cx('row mb-3')}>
        <h3 className={cx('col-3 fw-normal')}>Product</h3>
        <div className={cx('col-9 d-flex justify-content-end')}>
          <button className="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">+ Add Product</button>
        </div>
      </div>
      <div className={cx('row')}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"></th>
              <th scope="col">PRODUCT NAME</th>
              <th scope="col">PRICE</th>
              <th scope="col">CATEGORY</th>
              <th scope="col">PUBLISHED ON</th>
              <th scope="col">STATUS</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listItem.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>image</td>
                  <td>Apple MacBook Pro 13 inch-M1-8/256GB-space</td>
                  <td>10.000D</td>
                  <td>SamSung</td>
                  <td>Dec 01, 12:00 PM</td>
                  <td>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" role="switch" id={`flexSwitchCheckDefault${index}`} />
                      <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}`}>On</label>
                      {/* <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}`}>Off</label> */}
                    </div>
                  </td>
                  <td className={cx('col-btn text-end pe-4')}>
                    <button className="btn btn-warning me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight-edit" aria-controls="offcanvasRight-edit">Edit</button>
                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* <!-- Modal --> */}
      <div className="offcanvas offcanvas-end" data-bs-keyboard="true" data-bs-backdrop="static" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Create Account</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          ...
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div className="offcanvas offcanvas-end" data-bs-keyboard="true" data-bs-backdrop="static" tabIndex={-1} id="offcanvasRight-edit" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Edit Account</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          ...
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop" data-bs-keyboard="true" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure you want to delete?</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body d-flex justify-content-center">
              <IoIosWarning className={cx('icon-warning')} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product