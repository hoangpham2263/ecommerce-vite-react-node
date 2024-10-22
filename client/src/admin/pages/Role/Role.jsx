import classNames from 'classnames/bind'
import styles from './Role.module.scss'
import './Role.css'
import { useEffect, useState } from 'react'
import { readRole } from '../../services/adminApi.jsx'
import ModalCreate from './ModalCreate.jsx'
import ModalDelete from './ModalDelete.jsx'
import ModalEdit from './ModalEdit.jsx'

const cx = classNames.bind(styles)

const Role = () => {
  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(12)
  const [totalPages, setTotalPages] = useState(0)

  const fetchData = async () => {
    let fetchData = await readRole(currentPage, limit)
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

  return (
    <div className={cx('wrapper')}>
      <div className={cx('row mb-3')}>
        <h3 className={cx('col-3 fw-normal')}>Role</h3>
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
              <th scope="col">KEY ROLE</th>
              <th scope="col">PUBLISHED ON</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.role.map((item, index) => (
              <tr key={index}>
                <th scope="row">{(currentPage - 1) * limit + index + 1}</th>
                <td>{item?.name}</td>
                <td>{item?.key_role}</td>
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

export default Role
