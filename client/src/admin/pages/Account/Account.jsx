import classNames from 'classnames/bind'
import styles from './Account.module.scss'
import './Account.css'
import { useEffect, useState } from 'react'
import { readUser, updateUser } from '../../services/adminApi.jsx'
import ModalCreate from './ModalCreate'
import ModalDelete from './ModalDelete.jsx'
import { toast } from 'react-toastify'
import ModalEdit from './ModalEdit.jsx'

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

  const handleVerifyChange = async (id, newVerifyStatus) => {
    const data = { id: id, is_verified: newVerifyStatus }
    const res = await updateUser(data)
    if (res?.data?.code === 0) {
      toast.success('update verify succuss')
      fetchData()
    } else {
      toast.error(res?.data?.message)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    const data = { id: id, is_active: newStatus }
    const res = await updateUser(data)
    if (res?.data?.code === 0) {
      toast.success('update status success')
      fetchData()
    } else {
      toast.error(res?.data?.message)
    }
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
                  <th scope="row">{index + 1}</th>
                  <td>{item?.avatar ? <img className={cx('image-avatar')} src={item?.avatar} alt="..." /> : <p></p>}</td>
                  <td>{item?.full_name}</td>
                  <td>{item?.username}</td>
                  <td>{item?.email}</td>
                  <td>{item?.gender}</td>
                  <td>{item?.Position?.name}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" role="switch" id={`flexSwitchCheckDefault${index}-verify`} checked={item?.is_verified || false} onChange={(e) => handleVerifyChange(item.id, e.target.checked)} />
                      {item?.is_verified ? <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}-verify`}>On</label> : <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}`} onClick={() => handleVerifyChange(item?.id, !item?.is_verified)} >Off</label>}
                    </div>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" role="switch" id={`flexSwitchCheckDefault${index}-status`} checked={item?.is_active || false} onChange={(e) => handleStatusChange(item.id, e.target.checked)} />
                      {item.is_active ? <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}-status`}>On</label> : <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}`} onClick={() => handleStatusChange(item?.id, !item?.is_active)}>Off</label>}
                    </div>
                  </td>
                  <td>{`${new Date(item?.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                  })} ${new Date(item?.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}`}</td>
                  <td className={cx(' pe-4', 'col-btn')}>
                    <ModalEdit item={item} index={`modal-del-${index}`} />
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
    </div>
  )
}

export default Account