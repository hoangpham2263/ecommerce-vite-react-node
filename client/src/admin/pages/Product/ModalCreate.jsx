import './Product.css'
import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { createProduct, readBrand, readCapacity, readCategory, readRam, readVersion } from '../../services/privateApi.jsx'

const ModalCreate = ({ fetchProductData }) => {
  const [data, setData] = useState({
    desc: '',
    ram_id: '',
    capacity_id: '',
    category_id: '',
    brand_id: '',
    version_id: '',
    is_active: true
  })

  const [rams, setRams] = useState()
  const [capacities, setCapacities] = useState()
  const [categories, setCategories] = useState()
  const [brands, setBrands] = useState()
  const [versions, setVersions] = useState()

  const closeButtonRef = useRef(null)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (e) => {
    const { checked } = e.target
    setData((prev) => ({ ...prev, is_active: checked }))
  }

  const handleGetDataAttribute = async () => {
    const data = { page: 1, limit: 100 }
    const fetchRam = await readRam(data)
    const fetchCapacity = await readCapacity(data)
    const fetchCategory = await readCategory(data)
    setRams(fetchRam?.data?.data?.ram)
    setCapacities(fetchCapacity?.data?.data?.capacity)
    setCategories(fetchCategory?.data?.data?.category)
  }

  useEffect(() => {
    handleGetDataAttribute()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (data?.category_id && data.category_id.length > 0) {
        const dataBrand = { page: 1, limit: 100, category_id: data?.category_id }
        const result = await readBrand(dataBrand)
        setBrands(result?.data?.data?.brand)
        setVersions('')
      }
    }
    fetchData()
  }, [data?.category_id])

  useEffect(() => {
    const fetchData = async () => {
      if (data?.brand_id && data.brand_id.length > 0) {
        const dataVersion = { page: 1, limit: 100, brand_id: data?.brand_id }
        const result = await readVersion(dataVersion)
        setVersions(result?.data?.data?.version)
      }
    }
    fetchData()
  }, [data?.brand_id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await createProduct(data)
      setData({ desc: '', ram_id: '', capacity_id: '', category_id: '', brand_id: '', version_id: '', is_active: true })
      closeButtonRef.current.click()
      toast.success(res?.data?.message)
      fetchProductData()
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <span>
      <button className="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasProduct" aria-controls="offcanvasProduct">+ Add Product</button>
      <div className="offcanvas offcanvas-end" data-bs-keyboard="true" data-bs-backdrop="static" tabIndex={-1} id="offcanvasProduct" aria-labelledby="offcanvasRightLabelProduct">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabelProduct">Create Product</h5>
          <button ref={closeButtonRef} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          <form className="row g-3 needs-validation" noValidate>
            <div className="col-md-4">
              <label htmlFor="category_id" className="form-label">Category</label>
              <select
                className="form-select"
                id="category_id"
                name="category_id"
                value={data?.category_id}
                onChange={handleOnChange}
              >
                <option value={0}>select</option>
                {categories && categories.map((item, index) => (<option key={`category-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="brand_id" className="form-label">Brand</label>
              <select
                className="form-select"
                id="brand_id"
                name="brand_id"
                value={data?.brand_id}
                onChange={handleOnChange}
              >
                <option value={0}>select</option>
                {brands && brands.map((item, index) => (<option key={`brand-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="version_id" className="form-label">Version</label>
              <select
                className="form-select"
                id="version_id"
                name="version_id"
                value={data?.version_id}
                onChange={handleOnChange}
              >
                <option value={0}>select</option>
                {versions && versions.map((item, index) => (<option key={`version-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="ram_id" className="form-label">Ram</label>
              <select
                className="form-select"
                id="ram_id"
                name="ram_id"
                value={data?.ram_id}
                onChange={handleOnChange}
              >
                <option value={0}>select</option>
                {rams && rams.map((item, index) => (<option key={`ram-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="capacity_id" className="form-label">Capacity</label>
              <select
                className="form-select"
                id="capacity_id"
                name="capacity_id"
                value={data?.capacity_id}
                onChange={handleOnChange}
              >
                <option value={0}>select</option>
                {capacities && capacities.map((item, index) => (<option key={`capacity-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor={'flexSwitchCheckDefault-status'} className="form-label">Status</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={'flexSwitchCheckDefault-status'}
                  checked={data?.is_active}
                  onChange={handleStatusChange}
                />
                <label className="form-check-label" htmlFor={'flexSwitchCheckDefault-status'}>
                  {data?.is_active ? 'On' : 'Off'}
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <label htmlFor="desc" className="form-label">Description</label>
              <textarea value={data?.desc} className="form-control" id="desc" name="desc" required onChange={handleOnChange} rows="4"></textarea>
            </div>
            <div className="col-12">
              <button onClick={handleSubmit} className="btn btn-secondary" type="submit">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </span>
  )
}

export default ModalCreate
