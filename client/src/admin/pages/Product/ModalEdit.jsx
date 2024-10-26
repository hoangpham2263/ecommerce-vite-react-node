import { useEffect, useState, useRef } from 'react' // Import useRef
import { toast } from 'react-toastify'
import { readCapacity, readCategory, readColor, readRam, updateProduct } from '../../services/adminApi'

const ModalEdit = ({ item, index, fetchProductData }) => {
  const [data, setData] = useState({
    id: '',
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

  const [colors, setColors] = useState([])
  const [rams, setRams] = useState([])
  const [capacities, setCapacities] = useState([])
  const [categories, setCategories] = useState([])

  const closeButtonRef = useRef(null)

  const handleGetDataAttribute = async () => {
    try {
      const fetchColor = await readColor(1, 100)
      const fetchRam = await readRam(1, 100)
      const fetchCapacity = await readCapacity(1, 100)
      const fetchCategory = await readCategory(1, 100)
      setColors(fetchColor?.data?.data?.color || [])
      setRams(fetchRam?.data?.data?.ram || [])
      setCapacities(fetchCapacity?.data?.data?.capacity || [])
      setCategories(fetchCategory?.data?.data?.category || [])
    } catch (error) {
      toast.error('Failed to fetch product attributes')
    }
  }

  useEffect(() => {
    handleGetDataAttribute()
  }, [])

  const setDataDefault = (item) => {
    if (item) {
      setData({
        id: item.id || '',
        title: item.title || '',
        price: item.price || '',
        desc: item.desc || '',
        color_id: item.color_id || '',
        ram_id: item.ram_id || '',
        capacity_id: item.capacity_id || '',
        category_id: item.category_id || '',
        discount: item.discount || '',
        stock: item.stock || '',
        is_active: item.is_active || false
      })
    }
  }

  useEffect(() => {
    setDataDefault(item)
  }, [item])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (e) => {
    const { checked } = e.target
    setData((prev) => ({ ...prev, is_active: checked }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await updateProduct(data)
      if (res?.data?.code === 0) {
        // Trigger a click on the close button
        closeButtonRef.current.click()

        toast.success(res?.data?.message)
        fetchProductData()
      } else {
        toast.error(res?.data?.message)
      }
    } catch (error) {
      toast.error('An error occurred while updating the product')
    }
  }

  return (
    <span>
      <button className="btn btn-warning me-2" type="button" data-bs-toggle="offcanvas" data-bs-target={`#offcanvasProduct-edit-${index}`} aria-controls="offcanvasProduct-edit">Edit</button>
      <div className="offcanvas offcanvas-end" data-bs-keyboard="true" data-bs-backdrop="static" tabIndex={-1} id={`offcanvasProduct-edit-${index}`} aria-labelledby="offcanvasRightLabelProduct">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabelProduct">Edit Product</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            ref={closeButtonRef}
          />
        </div>

        <div className="offcanvas-body mb-6">
          <form className="row g-3 needs-validation" noValidate>
            <div className="col-md-12">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name='title' required onChange={handleOnChange} value={data.title} />
            </div>
            <div className="col-md-12">
              <label htmlFor="desc" className="form-label">Description</label>
              <input type="text" className="form-control" id="desc" name='desc' required onChange={handleOnChange} value={data.desc} />
            </div>
            <div className="col-md-6">
              <label htmlFor="color_id" className="form-label">Color</label>
              <select
                className="form-select"
                id="color_id"
                name="color_id"
                onChange={handleOnChange}
                value={data.color_id}
              >
                <option value={0}>Select</option>
                {colors.map((item, index) => (<option key={`color-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="ram_id" className="form-label">Ram</label>
              <select
                className="form-select"
                id="ram_id"
                name="ram_id"
                onChange={handleOnChange}
                value={data.ram_id}
              >
                <option value={0}>Select</option>
                {rams.map((item, index) => (<option key={`ram-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="capacity_id" className="form-label">Capacity</label>
              <select
                className="form-select"
                id="capacity_id"
                name="capacity_id"
                onChange={handleOnChange}
                value={data.capacity_id}
              >
                <option value={0}>Select</option>
                {capacities.map((item, index) => (<option key={`capacity-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="category_id" className="form-label">Category</label>
              <select
                className="form-select"
                id="category_id"
                name="category_id"
                onChange={handleOnChange}
                value={data.category_id}
              >
                <option value={0}>Select</option>
                {categories.map((item, index) => (<option key={`category-${index}`} value={item?.id}>{item?.name}</option>))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="discount" className="form-label">Discount</label>
              <input type="text" className="form-control" id="discount" name='discount' required onChange={handleOnChange} value={data.discount} />
            </div>
            <div className="col-md-6">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="text" className="form-control" id="price" name='price' required onChange={handleOnChange} value={data.price} />
            </div>
            <div className="col-md-6">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input type="text" className="form-control" id="stock" name='stock' required onChange={handleOnChange} value={data.stock} />
            </div>
            <div className="col-md-6">
              <label htmlFor={'flexSwitchCheckDefault-status'} className="form-label">Status</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={'flexSwitchCheckDefault-status'}
                  checked={data.is_active}
                  onChange={handleStatusChange}
                />
                <label className="form-check-label" htmlFor={'flexSwitchCheckDefault-status'}>
                  {data.is_active ? 'On' : 'Off'}
                </label>
              </div>
            </div>
            <div className="col-12 text-start">
              <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Save Edit</button>
            </div>
          </form>
        </div>
      </div>
    </span>
  )
}

export default ModalEdit
