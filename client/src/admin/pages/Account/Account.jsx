import classNames from 'classnames/bind'
import styles from './Account.module.scss'
import './Account.css'
import { useEffect, useState } from 'react'
import { readUser } from '../../services/adminApi.jsx'
import ModalCreate from './ModalCreate'
import ModalDelete from './ModalDelete.jsx'

const cx = classNames.bind(styles)

const Account = () => {
  const [data, setData] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    let fetchData = await readUser()
    setData(fetchData?.data)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('row mb-3')}>
        <h3 className={cx('col-3 fw-normal')}>Account</h3>
        <div className={cx('col-9 d-flex justify-content-end')}>
          <button className="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">+ Add Account</button>
        </div>
      </div>
      <div className={cx('row')}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"></th>
              <th scope="col">FULL NAME</th>
              <th scope="col">USERNAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">GENDER</th>
              <th scope="col">POSITION</th>
              <th scope="col">VERIFY</th>
              <th scope="col">STATUS</th>
              <th scope="col">PUBLISHED ON</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{item?.id}</th>
                  <td>image</td>
                  <td>{item?.full_name}</td>
                  <td>{item?.username}</td>
                  <td>{item?.email}</td>
                  <td>{item?.gender}</td>
                  <td>{item?.Position?.name}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" role="switch" id={`flexSwitchCheckDefault${index}-verify`} />
                      <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}-verify`}>On</label>
                      {/* <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}`}>Off</label> */}
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" role="switch" id={`flexSwitchCheckDefault${index}-status`} />
                      <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}-status`}>On</label>
                      {/* <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}`}>Off</label> */}
                    </div>
                  </td>
                  <td>Dec 01, 12:00 PM</td>
                  <td className={cx('col-btn text-end pe-4')}>
                    <button className="btn btn-warning me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight-edit" aria-controls="offcanvasRight-edit">Edit</button>
                    <ModalDelete id={item?.id} index={`modal-del-${index}`} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* <!-- Pagination --> */}
      <div className={cx('row')}>
        <nav aria-label="Page navigation example">
          <ul className="pagination  d-flex justify-content-end">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>

      {/* <!-- Modal Create --> */}
      <ModalCreate />

      {/* <!-- Modal Edit --> */}
      <div className="offcanvas offcanvas-end" data-bs-keyboard="true" data-bs-backdrop="static" tabIndex={-1} id="offcanvasRight-edit" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Edit Account</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          ...
        </div>
      </div>

    </div>
  )
}

export default Account