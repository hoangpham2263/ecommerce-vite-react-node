import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { createProduct, readCapacity, readCategory, readColor, readRam } from '../../services/adminApi.jsx'

const ModalCreate = ({ fetchProductData }) => {
  const [data, setData] = useState({
    title: '',
    price: '',
    desc: '',
    color_id: '',
    ram_id: '',
    capacity_id: '',
    category_id: '',
    discount: '',
    stock: '',
    is_active: ''
  })
  const [colors, setColors] = useState()
  const [rams, setRams] = useState()
  const [capacities, setCapacities] = useState()
  const [categories, setCategories] = useState()

  const closeButtonRef = useRef(null)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => { return { ...prev, [name]: value } })
  }

  const handleStatusChange = (e) => {
    const { checked } = e.target
    setData((prev) => ({ ...prev, is_active: checked }))
  }

  const handleGetDataAttribute = async () => {
    const fetchColor = await readColor(1, 100)
    const fetchRam = await readRam(1, 100)
    const fetchCapacity = await readCapacity(1, 100)
    const fetchCategory = await readCategory(1, 100)
    setColors(fetchColor?.data?.data?.color)
    setRams(fetchRam?.data?.data?.ram)
    setCapacities(fetchCapacity?.data?.data?.capacity)
    setCategories(fetchCategory?.data?.data?.category)
  }

  useEffect(() => {
    handleGetDataAttribute()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await createProduct(data)
    if (res?.data?.code === 0) {
      closeButtonRef.current.click()
      toast.success(res?.data?.message)
      fetchProductData()
    } else {
      toast.error(res?.data?.message)
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
            <div className="col-md-12">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name='title' required onChange={handleOnChange} />
            </div>
            <div className="col-md-12">
              <label htmlFor="desc" className="form-label">Description</label>
              <input type="text" className="form-control" id="desc" name='desc' required onChange={handleOnChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="color_id" className="form-label">Color</label>
              <select
                className="form-select"
                id="color_id"
                name="color_id"
                onChange={handleOnChange}
              >
                <option value={0}>select</option>
                {colors && colors.map((item, index) => (<option key={`color-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="ram_id" className="form-label">Ram</label>
              <select
                className="form-select"
                id="ram_id"
                name="ram_id"
                onChange={handleOnChange}
              >
                <option value={0}>select</option>
                {rams && rams.map((item, index) => (<option key={`ram-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="capacity_id" className="form-label">Capacity</label>
              <select
                className="form-select"
                id="capacity_id"
                name="capacity_id"
                onChange={handleOnChange}
              >
                <option value={0}>select</option>
                {capacities && capacities.map((item, index) => (<option key={`capacity-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="category_id" className="form-label">Category</label>
              <select
                className="form-select"
                id="category_id"
                name="category_id"
                onChange={handleOnChange}
              >
                <option value={0}>select</option>
                {categories && categories.map((item, index) => (<option key={`category-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="discount" className="form-label">Discount</label>
              <input type="text" className="form-control" id="discount" name='discount' required onChange={handleOnChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="text" className="form-control" id="price" name='price' required onChange={handleOnChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input type="text" className="form-control" id="stock" name='stock' required onChange={handleOnChange} />
            </div>
            <div className="col-md-6">
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
