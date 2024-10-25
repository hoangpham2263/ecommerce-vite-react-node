import classNames from 'classnames/bind'
import styles from './Product.module.scss'
import './Product.css'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { readImage, readProduct, updateProduct } from '../../services/adminApi.jsx'
import ModalCreateProduct from './ModalCreate.jsx'
import ModalEditProduct from './ModalEdit.jsx'
import ModalDeleteProduct from './ModalDelete.jsx'

const cx = classNames.bind(styles)

const Products = () => {
  const [products, setProducts] = useState(null)
  const [totalProductPages, setTotalProductPages] = useState(0)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [currentProductPage, setCurrentProductPage] = useState(1)

  const limitPage = {
    product: 12,
    brand: 12,
    version: 12
  }

  const fetchProductData = async () => {
    const fetchDataImage = await readImage(1, 100)
    const fetchDataProduct = await readProduct(currentProductPage, limitPage.product)
    const imageData = fetchDataImage?.data?.data?.image
    const productData = fetchDataProduct?.data?.data?.product

    const imagesByProductId = imageData.reduce((acc, image) => {
      if (!acc[image.product_id]) {
        acc[image.product_id] = []
      }
      acc[image.product_id].push(image)
      return acc
    }, {})
    const groupedProducts = productData.map((product) => {
      return {
        ...product,
        images: imagesByProductId[product.id] || []
      }
    })
    setProducts(groupedProducts)
    setTotalProductPages(fetchDataProduct?.data?.data?.totalPages)
  }

  const handlePageChange = (setPage, currentPage, totalPages, direction) => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const handleProductClick = (productId) => {
    setSelectedProductId(productId)
  }

  useEffect(() => {
    fetchProductData()
  }, [currentProductPage])

  const handleStatusChange = async (id, newStatus) => {
    const data = { id: id, is_active: newStatus }
    const res = await updateProduct(data)
    if (res?.data?.code === 0) {
      toast.success('Update status success')
      fetchProductData()
    } else {
      toast.error(res?.data?.message)
    }
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('row mb-3')}>
        <h3 className={cx('col-3 fw-normal')}>Product</h3>
        <div className={cx('col-9 d-flex justify-content-end')}>
          <ModalCreateProduct fetchProductData={fetchProductData} />
        </div>
      </div>

      <div className={cx('row')}>
        <div className={cx('col-md-12')}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"></th>
                <th scope="col">PRODUCT NAME</th>
                <th scope="col">PRICE</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">COLOR</th>
                <th scope="col">Capacity</th>
                <th scope="col">RAM</th>
                <th scope="col">STATUS</th>
                <th scope="col">PUBLISHED ON</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.map((item, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => handleProductClick(item.id)}
                    className={cx({ active: selectedProductId === item.id })}
                  >
                    <th scope="row">{(currentProductPage - 1) * limitPage.product + index + 1}</th>
                    <td>
                      <img src={item?.images[0]?.url || ''} className={cx('rounded float-start','image-product')} alt={item?.title}/>
                    </td>
                    <td>{item?.title}</td>
                    <td>{item?.price}đ</td>
                    <td>{item?.Category?.name}</td>
                    <td>{item?.Color?.name}</td>
                    <td>{item?.Capacity?.name}</td>
                    <td>{item?.Ram?.name}</td>
                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`flexSwitchCheckDefault${index}-status`}
                          checked={item?.is_active || false}
                          onChange={(e) => handleStatusChange(item.id, e.target.checked)}
                        />
                        {item.is_active ? (
                          <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}-status`}>On</label>
                        ) : (
                          <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}`} onClick={() => handleStatusChange(item?.id, !item?.is_active)}>Off</label>
                        )}
                      </div>
                    </td>
                    <td>
                      {`${new Date(item?.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                      })} ${new Date(item?.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}`}
                    </td>
                    <td className={cx('text-end', 'col-btn')}>
                      <ModalEditProduct item={item} index={`modal-edit-${index}`} fetchProductData={fetchProductData} />
                      <ModalDeleteProduct id={item?.id} index={`modal-del-${index}`} fetchProductData={fetchProductData} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {totalProductPages > 0 && (
            <div className={cx('row')}>
              <nav aria-label="Page navigation for products">
                <ul className="pagination d-flex justify-content-end">
                  <li className={`page-item ${currentProductPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentProductPage, currentProductPage, totalProductPages, 'prev')}>Previous</button>
                  </li>
                  {[...Array(totalProductPages)].map((_, index) => (
                    <li key={index} className={`page-item ${currentProductPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentProductPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentProductPage === totalProductPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(setCurrentProductPage, currentProductPage, totalProductPages, 'next')}>Next</button>
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

export default Products
