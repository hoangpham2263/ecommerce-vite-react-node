import { useEffect, useState, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'
import { readBrand, readCapacity, readCategory, readColorDetail, readRam, readVersion, updateProduct } from '../../services/privateApi'

const ModalEdit = ({ item, index, fetchProductData }) => {
  const [data, setData] = useState({
    title: '',
    desc: '',
    ram_id: '',
    capacity_id: '',
    category_id: '',
    brand_id: '',
    version_id: '',
    is_active: true
  })
  const [rams, setRams] = useState([])
  const [capacities, setCapacities] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState()
  const [versions, setVersions] = useState()
  const closeButtonRef = useRef(null)

  const handleGetDataAttribute = useCallback(async () => {
    try {
      const dataRam = { page: 1, limit: 100 }
      const dataCapacity = { page: 1, limit: 100 }
      const dataCategory = { page: 1, limit: 100 }
      const dataBrand = { page: 1, limit: 100, category_id: data?.category_id }
      const dataVersion = { page: 1, limit: 100, brand_id: data?.brand_id }
      const [fetchRam, fetchCapacity, fetchCategory, fetchBrand, fetchVersion] = await Promise.all([
        readRam(dataRam),
        readCapacity(dataCapacity),
        readCategory(dataCategory),
        readBrand(dataBrand),
        readVersion(dataVersion)
      ])
      setRams(fetchRam?.data?.data?.ram || [])
      setCapacities(fetchCapacity?.data?.data?.capacity || [])
      setCategories(fetchCategory?.data?.data?.category || [])
      setBrands(fetchBrand?.data?.data?.brand || [])
      setVersions(fetchVersion?.data?.data?.version || [])
    } catch {
      toast.error('Failed to fetch product attributes')
    }
  }, [data.brand_id, data.category_id])

  useEffect(() => {
    handleGetDataAttribute()
  }, [handleGetDataAttribute])

  const setDataDefault = useCallback((item) => {
    setData({
      id: item?.id || '',
      title: item?.title || '',
      desc: item?.desc || '',
      ram_id: item?.ram_id || '',
      capacity_id: item?.capacity_id || '',
      category_id: item?.category_id || '',
      brand_id: item?.brand_id || '',
      version_id: item?.version_id || '',
      is_active: item?.is_active || false,
    })
  }, [])

  useEffect(() => {
    setDataDefault(item)
  }, [item, setDataDefault])

  useEffect(() => {
    if (data.color_id) {
      readColorDetail(data.color_id).then((result) => {
        setData((prev) => ({ ...prev, buttonColor: result?.data?.data?.color_code || '#000' }))
      })
    }
  }, [data.color_id, fetchProductData])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStatusChange = (e) => setData((prev) => ({ ...prev, is_active: e.target.checked }))

  useEffect(() => {
    const fetchData = async () => {
      if (data?.category_id && data.category_id.length > 0) {
        const result = await readBrand(1, 100, data?.category_id)
        setBrands(result?.data?.data?.brand)
        setVersions('')
      }
    }
    fetchData()
  }, [data?.category_id])

  useEffect(() => {
    const fetchData = async () => {
      if (data?.brand_id && data.brand_id.length > 0) {
        const data = { page: 1, limit: 100, brand_id: data?.brand_id }
        const result = await readVersion(data)
        setVersions(result?.data?.data?.version)
      }
    }
    fetchData()
  }, [data?.brand_id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await updateProduct(data)
      if (res?.data?.code === 0) {
        closeButtonRef.current.click()
        toast.success(res?.data?.message)
        fetchProductData()
      } else {
        toast.error(res?.data?.message)
      }
    } catch {
      toast.error('An error occurred while updating the product')
    }
  }
  return (
    <span>
      <button
        className="btn btn-warning me-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvasProduct-edit-${index}`}
        aria-controls="offcanvasProduct-edit"
      >
        Edit
      </button>
      <div
        className="offcanvas offcanvas-end"
        data-bs-keyboard="true"
        data-bs-backdrop="static"
        tabIndex={-1}
        id={`offcanvasProduct-edit-${index}`}
        aria-labelledby="offcanvasRightLabelProduct"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabelProduct">Edit Product</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ref={closeButtonRef} />
        </div>
        <div className="offcanvas-body mb-6">
          <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="col-md-12 text-start">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" disabled id="title" name="title" required onChange={handleOnChange} value={data.title} />
            </div>
            <div className="col-md-4 text-start">
              <label htmlFor="category_id" className="form-label">Category</label>
              <select className="form-select" name="category_id" onChange={handleOnChange} value={data.category_id}>
                <option value="">Select</option>
                {categories && categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div className="col-md-4 text-start">
              <label htmlFor="brand_id" className="form-label">Brand</label>
              <select className="form-select" id="brand_id" name="brand_id" value={data?.brand_id} onChange={handleOnChange}>
                <option value={0}>select</option>
                {brands && brands.map((item, index) => (<option key={`brand-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-4 text-start">
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
            <div className="col-md-4 text-start">
              <label htmlFor="ram_id" className="form-label">Ram</label>
              <select className="form-select" name="ram_id" onChange={handleOnChange} value={data.ram_id}>
                <option value="">Select</option>
                {rams && rams.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
            <div className="col-md-4 text-start">
              <label htmlFor="capacity_id" className="form-label">Capacity</label>
              <select className="form-select" name="capacity_id" onChange={handleOnChange} value={data.capacity_id}>
                <option value="">Select</option>
                {capacities && capacities.map((cap) => <option key={cap.id} value={cap.id}>{cap.name}</option>)}
              </select>
            </div>
            <div className="col-md-4 text-start">
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
            <div className="col-md-12 text-start">
              <label htmlFor="desc" className="form-label">Description</label>
              <textarea value={data?.desc} className="form-control" id="desc" name="desc" required onChange={handleOnChange} rows="4"></textarea>
            </div>
            <div className="col-12 text-start">
              <button className="btn btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </span>
  )
}

export default ModalEdit
