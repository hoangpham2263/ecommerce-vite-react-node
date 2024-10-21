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
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(0) // Quản lý tổng số trang

  // Hàm gọi API để lấy dữ liệu
  const fetchData = async () => {
    let fetchData = await readUser(currentPage, limit)
    setData(fetchData?.data)
    // Tính toán tổng số trang, thêm kiểm tra để đảm bảo giá trị hợp lệ
    const totalItems = fetchData?.data?.totalItems || 0
    setTotalPages(fetchData?.data?.data?.totalPages)
  }

  // Cập nhật dữ liệu khi `currentPage` thay đổi
  useEffect(() => {
    fetchData()
  }, [currentPage, limit])

  // Xử lý khi người dùng thay đổi trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Hàm xử lý khi người dùng thay đổi trạng thái xác thực
  const handleVerifyChange = async (id, newVerifyStatus) => {
    const data = { id: id, is_verified: newVerifyStatus }
    const res = await updateUser(data)
    if (res?.data?.code === 0) {
      toast.success('Update verify success')
      fetchData()
    } else {
      toast.error(res?.data?.message)
    }
  }

  // Hàm xử lý khi người dùng thay đổi trạng thái hoạt động
  const handleStatusChange = async (id, newStatus) => {
    const data = { id: id, is_active: newStatus }
    const res = await updateUser(data)
    if (res?.data?.code === 0) {
      toast.success('Update status success')
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
            {data?.data?.user.map((item, index) => (
              <tr key={index}>
                <th scope="row">{(currentPage - 1) * limit + index + 1}</th>
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className={cx('row')}>
          <nav aria-label="Page navigation example">
            <ul className="pagination  d-flex justify-content-end">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Modal Create */}
      <ModalCreate />
    </div>
  )
}

export default Account
