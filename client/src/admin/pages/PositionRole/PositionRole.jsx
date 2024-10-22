import classNames from 'classnames/bind'
import styles from './PositionRole.module.scss'
import './PositionRole.css'
import { useEffect, useState } from 'react'
import { readPosition, readPositionRole, readPositionRoleReverse, readRole } from '../../services/adminApi.jsx'
import ModalCreate from './ModalCreate.jsx'
import ModalDelete from './ModalDelete.jsx'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

const PositionRole = () => {
  const [selectedKeyPosition, setSelectedKeyPosition] = useState(2)

  // position
  const [dataPosition, setDataPosition] = useState()
  const [currentPagePosition, setCurrentPagePosition] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [limitPosition, setLimitPosition] = useState(12)
  const [totalPagesPosition, setTotalPagesPosition] = useState(0)

  const fetchDataPosition = async () => {
    let fetchData = await readPosition(currentPagePosition, limitPosition)
    setDataPosition(fetchData?.data)
    setTotalPagesPosition(fetchData?.data?.data?.totalPages)
  }
  useEffect(() => {
    fetchDataPosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPagePosition, limitPosition])
  const handlePageChangePosition = (page) => {
    if (page >= 1 && page <= totalPagesPosition) {
      setCurrentPagePosition(page)
    }
  }

  // position role
  const [dataPositionRole, setDataPositionRole] = useState()
  const [currentPagePositionRole, setCurrentPagePositionRole] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [limitPositionRole, setLimitPositionRole] = useState(20)
  const [totalPagesPositionRole, setTotalPagesPositionRole] = useState(0)

  useEffect(() => {
    fetchDataPositionRole()
    fetchDataRole()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPagePositionRole, limitPositionRole, selectedKeyPosition])

  const fetchDataPositionRole = async () => {
    let fetchData = await readPositionRole(currentPagePositionRole, limitPositionRole, selectedKeyPosition)
    setDataPositionRole(fetchData?.data)
    setTotalPagesPositionRole(fetchData?.data?.data?.totalPages)
  }
  useEffect(() => {
    fetchDataPositionRole()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPagePositionRole, limitPositionRole])
  const handlePageChangePositionRole = (page) => {
    if (page >= 1 && page <= totalPagesPositionRole) {
      setCurrentPagePositionRole(page)
    }
  }

  // Role
  const [dataRole, setDataRole] = useState()
  const [currentPageRole, setCurrentPageRole] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [limitRole, setLimitRole] = useState(15)
  const [totalPagesRole, setTotalPagesRole] = useState(0)

  const fetchDataRole = async () => {
    let fetchData = await readPositionRoleReverse(currentPageRole, limitRole, selectedKeyPosition)
    setDataRole(fetchData?.data)
    setTotalPagesRole(fetchData?.data?.data?.totalPages)
  }
  useEffect(() => {
    fetchDataRole()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageRole, limitRole])

  const handlePageChangeRole = (page) => {
    if (page >= 1 && page <= totalPagesRole) {
      setCurrentPageRole(page)
    }
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('row mb-3')}>
        <h3 className={cx('col-3 fw-normal')}>Position Role</h3>
        <div className={cx('col-9 d-flex justify-content-end')}>
          <ModalCreate />
        </div>
      </div>

      {/* ----- Position ----- */}
      <div className={cx('row')}>
        <div className='col-md-2'>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ROLE</th>
              </tr>
            </thead>
            <tbody>
              {dataPosition?.data?.position.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedKeyPosition(item.key_position)}
                  style={{ cursor: 'pointer', backgroundColor: selectedKeyPosition === item.key_position ? '#e0e0e0' : 'transparent' }}
                >
                  <th scope="row">{(currentPagePosition - 1) * limitPosition + index + 1}</th>
                  <td>{item?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          {totalPagesPosition > 0 && (
            <div className={cx('row')}>
              <nav aria-label="Page navigation example">
                <ul className="pagination  d-flex justify-content-end">
                  <li className={`page-item ${currentPagePosition === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChangePosition(currentPagePosition - 1)}>Previous</button>
                  </li>
                  {[...Array(totalPagesPosition)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPagePosition === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChangePosition(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPagePosition === totalPagesPosition ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChangePosition(currentPagePosition + 1)}>Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* ----- Position Role ----- */}
        <div className={cx('col-md-5')}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NAME</th>
              </tr>
            </thead>
            <tbody>
              {dataPositionRole?.data?.positionRole.length ? (
                dataPositionRole.data.positionRole.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{(currentPagePositionRole - 1) * limitPositionRole + index + 1}</th>
                    <td>{item?.Role?.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th scope="row" colSpan="2">No access permissions granted yet.</th>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination */}
          {totalPagesPositionRole > 0 && (
            <div className={cx('row')}>
              <nav aria-label="Page navigation example">
                <ul className="pagination  d-flex justify-content-end">
                  <li className={`page-item ${currentPagePositionRole === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChangePositionRole(currentPagePositionRole - 1)}>Previous</button>
                  </li>
                  {[...Array(totalPagesPositionRole)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPagePositionRole === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChangePositionRole(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPagePositionRole === totalPagesPositionRole ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChangePositionRole(currentPagePositionRole + 1)}>Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* ----- Role ----- */}
        <div className={cx('col-md-5')}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NAME</th>
              </tr>
            </thead>
            <tbody>
              {dataRole?.data?.rolesNotAssigned.length ? (
                dataRole.data.rolesNotAssigned.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{(currentPageRole - 1) * limitRole + index + 1}</th>
                    <td>{item?.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th scope="row" colSpan="2">Current role is full privileged</th>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination */}
          {totalPagesRole > 0 && (
            <div className={cx('row')}>
              <nav aria-label="Page navigation example">
                <ul className="pagination  d-flex justify-content-end">
                  <li className={`page-item ${currentPageRole === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChangeRole(currentPageRole - 1)}>Previous</button>
                  </li>
                  {[...Array(totalPagesRole)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPageRole === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChangeRole(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPageRole === totalPagesRole ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChangeRole(currentPageRole + 1)}>Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PositionRole
