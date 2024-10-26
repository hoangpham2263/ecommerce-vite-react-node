import classNames from 'classnames/bind'
import styles from './ProductCategories.module.scss'
import './ProductCategories.css'
import { useEffect, useState } from 'react'
import { readBrand, readCategory, readVersion } from '../../services/adminApi.jsx'
import ModalCreateCategory from './Category/ModalCreate.jsx'
import ModalEditCategory from './Category/ModalEdit.jsx'
import ModalDeleteCategory from './Category/ModalDelete.jsx'
import ModalCreateBrand from './Brand/ModalCreate.jsx'
import ModalEditBrand from './Brand/ModalEdit.jsx'
import ModalDeleteBrand from './Brand/ModalDelete.jsx'
import ModalCreateVersion from './Version/ModalCreate.jsx'
import ModalEditVersion from './Version/ModalEdit.jsx'
import ModalDeleteVersion from './Version/ModalDelete.jsx'

const cx = classNames.bind(styles)

const ProductCategories = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedBrandId, setSelectedBrandId] = useState(null)

  const [currentCategoryPage, setCurrentCategoryPage] = useState(1)
  const [currentBrandPage, setCurrentBrandPage] = useState(1)
  const [currentVersionPage, setCurrentVersionPage] = useState(1)

  const limitPage = {
    category: 12,
    brand: 12,
    version: 12
  }

  const [categories, setCategories] = useState(null)
  const [brands, setBrands] = useState(null)
  const [versions, setVersions] = useState(null)

  const [totalCategoryPages, setTotalCategoryPages] = useState(0)
  const [totalBrandPages, setTotalBrandPages] = useState(0)
  const [totalVersionPages, setTotalVersionPages] = useState(0)

  const fetchCategoryData = async () => {
    const fetchData = await readCategory(currentCategoryPage, limitPage.category)
    setCategories(fetchData?.data)
    setTotalCategoryPages(fetchData?.data?.data?.totalPages)
  }

  const fetchBrandData = async (categoryId) => {
    if (categoryId) {
      const fetchData = await readBrand(currentBrandPage, limitPage.brand, categoryId)
      setBrands(fetchData?.data)
      setTotalBrandPages(fetchData?.data?.data?.totalPages)
    }
  }

  const fetchVersionData = async (brandId = 0) => {
    const fetchData = await readVersion(currentVersionPage, limitPage.version, brandId)
    setVersions(fetchData?.data)
    setTotalVersionPages(fetchData?.data?.data?.totalPages)
  }

  const handlePageChange = (setPage, currentPage, totalPages, direction) => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategoryId(categoryId)
    setSelectedBrandId(null)
    setVersions(null)
    setCurrentBrandPage(1)
    setCurrentVersionPage(1)
  }

  useEffect(() => {
    fetchCategoryData()
  }, [currentCategoryPage])

  useEffect(() => {
    if (selectedCategoryId) {
      fetchBrandData(selectedCategoryId)
    }
  }, [selectedCategoryId, currentBrandPage])

  useEffect(() => {
    if (selectedBrandId) {
      fetchVersionData(selectedBrandId)
    }
  }, [selectedBrandId, currentVersionPage])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('row mb-3')}>
        <h3 className={cx('col-md-12 fw-normal mb-3')}>Product Categories</h3>
      </div>

      <div className={cx('row')}>
        {/* ----- Categories ----- */}
        <div className={cx('col-md-4')}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories?.data?.category.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => handleCategoryClick(item.id)}
                  className={cx({ active: selectedCategoryId === item.id })}
                >
                  <th scope="row">{(currentCategoryPage - 1) * limitPage.category + index + 1}</th>
                  <td>{item?.name}</td>
                  <td className='text-end'>
                    <ModalEditCategory item={item} index={`modal-del-${index}`} fetchCategoryData={fetchCategoryData} />
                    <ModalDeleteCategory id={item?.id} index={`modal-del-${index}`} fetchCategoryData={fetchCategoryData} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ModalCreateCategory fetchCategoryData={fetchCategoryData} />
          {totalCategoryPages > 0 && (
            <div className={cx('row')}>
              <nav aria-label="Page navigation for categories">
                <ul className="pagination d-flex justify-content-end">
                  <li className={`page-item ${currentCategoryPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentCategoryPage, currentCategoryPage, totalCategoryPages, 'prev')}>Previous</button>
                  </li>
                  {[...Array(totalCategoryPages)].map((_, index) => (
                    <li key={index} className={`page-item ${currentCategoryPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentCategoryPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentCategoryPage === totalCategoryPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentCategoryPage, currentCategoryPage, totalCategoryPages, 'next')}>Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* ----- Brands ----- */}
        <div className={cx('col-md-4')}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">BRAND</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {brands?.data?.brand.length ? (
                brands.data.brand.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedBrandId(item.id)}
                    className={cx({ active: selectedBrandId === item.id })}
                  >
                    <th scope="row">{(currentBrandPage - 1) * limitPage.brand + index + 1}</th>
                    <td>{item?.name}</td>
                    <td className='text-end'>
                      <ModalEditBrand item={item} index={`modal-del-${index}`} categoryId={selectedCategoryId} fetchBrandData={fetchBrandData} />
                      <ModalDeleteBrand id={item?.id} index={`modal-del-${index}`} categoryId={selectedCategoryId} fetchBrandData={fetchBrandData} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th scope="row" colSpan="3">No brand</th>
                </tr>
              )}
            </tbody>
          </table>
          <ModalCreateBrand categoryId={selectedCategoryId} fetchBrandData={fetchBrandData} />
          {totalBrandPages > 0 && (
            <div className={cx('row')}>
              <nav aria-label="Page navigation for brands">
                <ul className="pagination d-flex justify-content-end">
                  <li className={`page-item ${currentBrandPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentBrandPage, currentBrandPage, totalBrandPages, 'prev')}>Previous</button>
                  </li>
                  {[...Array(totalBrandPages)].map((_, index) => (
                    <li key={index} className={`page-item ${currentBrandPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentBrandPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentBrandPage === totalBrandPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentBrandPage, currentBrandPage, totalBrandPages, 'next')}>Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* ----- Versions ----- */}
        <div className={cx('col-md-4')}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">VERSION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {versions?.data?.version.length ? (
                versions.data.version.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{(currentVersionPage - 1) * limitPage.version + index + 1}</th>
                    <td>{item?.name}</td>
                    <td className='text-end'>
                      <ModalEditVersion item={item} index={`modal-del-${index}`} fetchVersionData={fetchVersionData} selectedBrandId={selectedBrandId} />
                      <ModalDeleteVersion id={item?.id} index={`modal-del-${index}`} fetchVersionData={fetchVersionData} selectedBrandId={selectedBrandId} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th scope="row" colSpan="2">No version</th>
                </tr>
              )}
            </tbody>
          </table>
          <ModalCreateVersion selectedBrandId={selectedBrandId} fetchVersionData={fetchVersionData} />
          {totalVersionPages > 0 && (
            <div className={cx('row')}>
              <nav aria-label="Page navigation for versions">
                <ul className="pagination d-flex justify-content-end">
                  <li className={`page-item ${currentVersionPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentVersionPage, currentVersionPage, totalVersionPages, 'prev')}>Previous</button>
                  </li>
                  {[...Array(totalVersionPages)].map((_, index) => (
                    <li key={index} className={`page-item ${currentVersionPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentVersionPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentVersionPage === totalVersionPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentVersionPage, currentVersionPage, totalVersionPages, 'next')}>Next</button>
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

export default ProductCategories
