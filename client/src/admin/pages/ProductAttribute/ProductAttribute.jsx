import classNames from 'classnames/bind'
import styles from './ProductAttribute.module.scss'
import './ProductAttribute.css'
import { useEffect, useState } from 'react'
import { readCapacity, readColor, readRam } from '../../services/privateApi.jsx'
import ModalCreateColor from './Color/ModalCreate.jsx'
import ModalEditColor from './Color/ModalEdit.jsx'
import ModalDeleteColor from './Color/ModalDelete.jsx'
import ModalCreateCapacity from './Capacity/ModalCreate.jsx'
import ModalEditCapacity from './Capacity/ModalEdit.jsx'
import ModalDeleteCapacity from './Capacity/ModalDelete.jsx'
import ModalCreateRam from './Ram/ModalCreate.jsx'
import ModalEditRam from './Ram/ModalEdit.jsx'
import ModalDeleteRam from './Ram/ModalDelete.jsx'

const cx = classNames.bind(styles)

const ProductAttribute = () => {

  // Pagination states
  const [currentPageColor, setCurrentPageColor] = useState(1)
  const [currentPageCapacity, setCurrentPageCapacity] = useState(1)
  const [currentPageRam, setCurrentPageRam] = useState(1)

  const [limitColor, setLimitColor] = useState(12)
  const [limitCapacity, setLimitCapacity] = useState(12)
  const [limitRam, setLimitRam] = useState(12)

  const [dataColor, setDataColor] = useState()
  const [dataCapacity, setDataCapacity] = useState()
  const [dataRam, setDataRam] = useState()

  const [totalPagesColor, setTotalPagesColor] = useState(0)
  const [totalPagesCapacity, setTotalPagesCapacity] = useState(0)
  const [totalPagesRam, setTotalPagesRam] = useState(0)

  // Fetch Color Data
  const fetchDataColor = async () => {
    const fetchData = await readColor(currentPageColor, limitColor)
    setDataColor(fetchData?.data)
    setTotalPagesColor(fetchData?.data?.data?.totalPages)
  }

  // Fetch Capacity Data
  const fetchDataCapacity = async () => {
    const fetchData = await readCapacity(currentPageCapacity, limitCapacity)
    setDataCapacity(fetchData?.data)
    setTotalPagesCapacity(fetchData?.data?.data?.totalPages)
  }

  // Fetch RAM Data
  const fetchDataRam = async () => {
    const fetchData = await readRam(currentPageRam, limitRam)
    setDataRam(fetchData?.data)
    setTotalPagesRam(fetchData?.data?.data?.totalPages)
  }

  // Handle pagination
  const handlePageChange = (setter, currentPage, totalPages, direction) => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1
    if (newPage >= 1 && newPage <= totalPages) {
      setter(newPage)
    }
  }

  useEffect(() => {
    fetchDataColor()
    fetchDataCapacity()
    fetchDataRam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageColor, limitColor, currentPageCapacity, limitCapacity, currentPageRam, limitRam])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('row mb-3')}>
        <h3 className={cx('col-md-12 fw-normal mb-3')}>Product Attributes</h3>
      </div>

      <div className={cx('row')}>
        {/* ----- Color ----- */}
        <div className={cx('col-md-4')}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">COLOR</th>
                <th scope="col">COLOR CODE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataColor?.data?.color.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{(currentPageColor - 1) * limitColor + index + 1}</th>
                  <td>{item?.name}</td>
                  <td>{item?.color_code}</td>
                  <td className='text-end'>
                    <ModalEditColor item={item} index={`modal-del-${index}`} fetchDataColor={fetchDataColor} />
                    <ModalDeleteColor id={item?.id} index={`modal-del-${index}`} fetchDataColor={fetchDataColor} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ModalCreateColor fetchDataColor={fetchDataColor} />
          {/* Pagination */}
          {totalPagesColor > 0 && (
            <div className={cx('row')}>
              <nav aria-label="Page navigation example">
                <ul className="pagination d-flex justify-content-end">
                  <li className={`page-item ${currentPageColor === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentPageColor, currentPageColor, totalPagesColor, 'prev')}>Previous</button>
                  </li>
                  {[...Array(totalPagesColor)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPageColor === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPageColor(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPageColor === totalPagesColor ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentPageColor, currentPageColor, totalPagesColor, 'next')}>Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* ----- Capacity ----- */}
        <div className={cx('col-md-4')}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">CAPACITY</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                dataCapacity?.data?.capacity.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{(currentPageCapacity - 1) * limitCapacity + index + 1}</th>
                    <td>{item?.name}</td>
                    <td className='text-end'>
                      <ModalEditCapacity item={item} index={`modal-del-${index}`} fetchDataCapacity={fetchDataCapacity}/>
                      <ModalDeleteCapacity id={item?.id} index={`modal-del-${index}`} fetchDataCapacity={fetchDataCapacity}/>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <ModalCreateCapacity fetchDataCapacity={fetchDataCapacity}/>
          {/* Pagination */}
          {totalPagesCapacity > 0 && (
            <div className={cx('row')}>
              <nav aria-label="Page navigation example">
                <ul className="pagination d-flex justify-content-end">
                  <li className={`page-item ${currentPageCapacity === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentPageCapacity, currentPageCapacity, totalPagesCapacity, 'prev')}>Previous</button>
                  </li>
                  {[...Array(totalPagesCapacity)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPageCapacity === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPageCapacity(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPageCapacity === totalPagesCapacity ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentPageCapacity, currentPageCapacity, totalPagesCapacity, 'next')}>Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* ----- RAM ----- */}
        <div className={cx('col-md-4')}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">RAM</th>
              </tr>
            </thead>
            <tbody>
              {dataRam?.data?.ram.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{(currentPageRam - 1) * limitRam + index + 1}</th>
                  <td>{item?.name}</td>
                  <td className='text-end'>
                    <ModalEditRam item={item} index={`modal-del-${index}`} fetchDataRam={fetchDataRam}/>
                    <ModalDeleteRam id={item?.id} index={`modal-del-${index}`} fetchDataRam={fetchDataRam}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ModalCreateRam fetchDataRam={fetchDataRam}/>
          {/* Pagination */}
          {totalPagesRam > 0 && (
            <div className={cx('row')}>
              <nav aria-label="Page navigation example">
                <ul className="pagination d-flex justify-content-end">
                  <li className={`page-item ${currentPageRam === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentPageRam, currentPageRam, totalPagesRam, 'prev')}>Previous</button>
                  </li>
                  {[...Array(totalPagesRam)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPageRam === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPageRam(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPageRam === totalPagesRam ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentPageRam, currentPageRam, totalPagesRam, 'next')}>Next</button>
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

export default ProductAttribute
