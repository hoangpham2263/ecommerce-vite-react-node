import classNames from 'classnames/bind'
import styles from './PositionRole.module.scss'
import './PositionRole.css'
import { useEffect, useState } from 'react'
import {
  createPositionRole,
  deletePositionRole,
  readPosition,
  readPositionIsMaster,
  readPositionRole,
  readPositionRoleReverse
} from '../../services/adminApi.jsx'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

const PositionRole = () => {
  const [selectedKeyPosition, setSelectedKeyPosition] = useState(1)
  const [isMaster, setIsMaster] = useState(false)

  // Pagination states
  const [currentPagePosition, setCurrentPagePosition] = useState(1)
  const [currentPagePositionRole, setCurrentPagePositionRole] = useState(1)
  const [currentPageRole, setCurrentPageRole] = useState(1)

  const [limitPosition, setLimitPosition] = useState(12)
  const [limitPositionRole, setLimitPositionRole] = useState(12)
  const [limitRole, setLimitRole] = useState(12)

  const [dataPosition, setDataPosition] = useState()
  const [dataPositionRole, setDataPositionRole] = useState()
  const [dataRole, setDataRole] = useState()

  const [totalPagesPosition, setTotalPagesPosition] = useState(0)
  const [totalPagesPositionRole, setTotalPagesPositionRole] = useState(0)
  const [totalPagesRole, setTotalPagesRole] = useState(0)

  const handleCheckIsMaster = async () => {
    const res = await readPositionIsMaster(selectedKeyPosition)
    if (res?.data?.code === 0) {
      setIsMaster(res?.data?.data)
    } else {
      toast.error(res?.data?.message)
    }
  }

  // Fetch Position Data
  const fetchDataPosition = async () => {
    const fetchData = await readPosition(currentPagePosition, limitPosition)
    setDataPosition(fetchData?.data)
    setTotalPagesPosition(fetchData?.data?.data?.totalPages)
  }

  // Fetch Position Role Data
  const fetchDataPositionRole = async () => {
    const fetchData = await readPositionRole(currentPagePositionRole, limitPositionRole, selectedKeyPosition)
    setDataPositionRole(fetchData?.data)
    setTotalPagesPositionRole(fetchData?.data?.data?.totalPages)
  }

  // Fetch Roles Data
  const fetchDataRole = async () => {
    const fetchData = await readPositionRoleReverse(currentPageRole, limitRole, selectedKeyPosition)
    setDataRole(fetchData?.data)
    setTotalPagesRole(fetchData?.data?.data?.totalPages)
  }

  // Handle pagination
  const handlePageChange = (setter, currentPage, totalPages, direction) => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1
    if (newPage >= 1 && newPage <= totalPages) {
      setter(newPage)
    }
  }

  // Delete Role
  const handleDelRoleByPosition = async (item, e) => {
    e.preventDefault()
    const res = await deletePositionRole(item.id)
    if (res?.data?.code === 0) {
      toast.success(res?.data?.message)
      fetchDataPositionRole()
      fetchDataRole()
    } else {
      toast.error(res?.data?.message)
    }
  }

  // Add Role
  const handleAddRoleByPosition = async (item, e) => {
    e.preventDefault()
    const data = { PositionId: selectedKeyPosition, RoleId: item?.id }
    const res = await createPositionRole(data)
    if (res?.data?.code === 0) {
      toast.success(res?.data?.message)
      fetchDataPositionRole()
      fetchDataRole()
    } else {
      toast.error(res?.data?.message)
    }
  }

  useEffect(() => {
    handleCheckIsMaster()
    fetchDataPosition()
    fetchDataPositionRole()
    fetchDataRole()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPagePosition, limitPosition, currentPagePositionRole, limitPositionRole, selectedKeyPosition, currentPageRole, limitRole])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('row mb-3')}>
        <h3 className={cx('col-md-12 fw-normal mb-3')}>Position Role</h3>
      </div>

      <div className={cx('row')}>
        {/* ----- Position ----- */}
        <div className='col-md-3'>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">POSITION</th>
              </tr>
            </thead>
            <tbody>
              {dataPosition?.data?.position.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedKeyPosition(item.key_position)}
                  className={cx({ active: selectedKeyPosition === item.key_position })}
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
                <ul className="pagination d-flex justify-content-end">
                  <li className={`page-item ${currentPagePosition === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentPagePosition, currentPagePosition, totalPagesPosition, 'prev')}>Previous</button>
                  </li>
                  {[...Array(totalPagesPosition)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPagePosition === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPagePosition(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPagePosition === totalPagesPosition ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentPagePosition, currentPagePosition, totalPagesPosition, 'next')}>Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* ----- Position Role ----- */}
        <div className={cx('col-md-4')}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">POSITION ROLE</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {isMaster ?
              <tbody>
                <tr>
                  <th scope="row" colSpan="2">Master is full permission</th>
                </tr>
              </tbody> : <tbody>
                {dataPositionRole?.data?.positionRole.length ? (
                  dataPositionRole.data.positionRole.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{(currentPagePositionRole - 1) * limitPositionRole + index + 1}</th>
                      <td>{item?.Role?.name}</td>
                      <td className='text-end'>
                        <button className="btn btn-danger" type="button" onClick={(e) => handleDelRoleByPosition(item, e)}>Remove Permission</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <th scope="row" colSpan="2">No access permissions granted yet.</th>
                  </tr>
                )}
              </tbody>}
          </table>

          {/* Pagination */}
          {!isMaster && totalPagesPositionRole > 0 && (
            <div className={cx('row')}>
              <nav aria-label="Page navigation example">
                <ul className="pagination d-flex justify-content-end">
                  <li className={`page-item ${currentPagePositionRole === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentPagePositionRole, currentPagePositionRole, totalPagesPositionRole, 'prev')}>Previous</button>
                  </li>
                  {[...Array(totalPagesPositionRole)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPagePositionRole === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPagePositionRole(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPagePositionRole === totalPagesPositionRole ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentPagePositionRole, currentPagePositionRole, totalPagesPositionRole, 'next')}>Next</button>
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
                <th scope="col">ROLE</th>
              </tr>
            </thead>
            {isMaster ?
              <tbody>
                <tr>
                  <th scope="row" colSpan="2">Master is full permission</th>
                </tr>
              </tbody> :
              <tbody>
                {dataRole?.data?.rolesNotAssigned.length ? (
                  dataRole.data.rolesNotAssigned.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{(currentPageRole - 1) * limitRole + index + 1}</th>
                      <td>{item?.name}</td>
                      <td className='text-end'>
                        <button className="btn btn-success" type="button" onClick={(e) => handleAddRoleByPosition(item, e)}>Add Permission</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <th scope="row" colSpan="2">Current role is fully privileged</th>
                  </tr>
                )}
              </tbody>
            }
          </table>
          {/* Pagination */}
          {!isMaster && totalPagesRole > 0 && (
            <div className={cx('row')}>
              <nav aria-label="Page navigation example">
                <ul className="pagination d-flex justify-content-end">
                  <li className={`page-item ${currentPageRole === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentPageRole, currentPageRole, totalPagesRole, 'prev')}>Previous</button>
                  </li>
                  {[...Array(totalPagesRole)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPageRole === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPageRole(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPageRole === totalPagesRole ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentPageRole, currentPageRole, totalPagesRole, 'next')}>Next</button>
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
