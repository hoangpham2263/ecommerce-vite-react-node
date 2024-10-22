import classNames from 'classnames/bind'
import styles from './Position.module.scss'
import './Position.css'
import { useEffect, useState } from 'react'
import { readPosition, updatePosition } from '../../services/adminApi.jsx'
import ModalCreate from './ModalCreate'
import ModalDelete from './ModalDelete.jsx'
import { toast } from 'react-toastify'
import ModalEdit from './ModalEdit.jsx'

const cx = classNames.bind(styles)

const Position = () => {
  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(0)

  const fetchData = async () => {
    let fetchData = await readPosition(currentPage, limit)
    setData(fetchData?.data)
    setTotalPages(fetchData?.data?.data?.totalPages)
  }

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limit])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleIsMasterChange = async (id, newVerifyStatus) => {
    const data = { id: id, is_master: newVerifyStatus }
    const res = await updatePosition(data)
    if (res?.data?.code === 0) {
      toast.success('Update verify success')
      fetchData()
    } else {
      toast.error(res?.data?.message)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    const data = { id: id, is_active: newStatus }
    const res = await updatePosition(data)
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
        <h3 className={cx('col-3 fw-normal')}>Position</h3>
        <div className={cx('col-9 d-flex justify-content-end')}>
          <ModalCreate />
        </div>
      </div>

      <div className={cx('row')}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">NAME</th>
              <th scope="col">KEY POSITION</th>
              <th scope="col">DESC</th>
              <th scope="col">STATUS</th>
              <th scope="col">IS MASTER</th>
              <th scope="col">PUBLISHED ON</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.position.map((item, index) => (
              <tr key={index}>
                <th scope="row">{(currentPage - 1) * limit + index + 1}</th>
                <td>{item?.name}</td>
                <td>{item?.key_position}</td>
                <td>{item?.desc}</td>
                <td>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id={`flexSwitchCheckDefault${index}-status`} checked={item?.is_active || false} onChange={(e) => handleStatusChange(item.id, e.target.checked)} />
                    {item.is_active ? <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}-status`}>On</label> : <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}`} onClick={() => handleStatusChange(item?.id, !item?.is_active)}>Off</label>}
                  </div>
                </td>
                <td>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id={`flexSwitchCheckDefault${index}-verify`} checked={item?.is_master || false} onChange={(e) => handleIsMasterChange(item.id, e.target.checked)} />
                    {item?.is_master ? <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}-verify`}>On</label> : <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}`} onClick={() => handleIsMasterChange(item?.id, !item?.is_master)} >Off</label>}
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
    </div>
  )
}

export default Position
