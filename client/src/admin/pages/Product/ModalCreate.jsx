import './Product.css'
import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { createProduct, readBrand, readCapacity, readCategory, readColor, readRam, readVersion } from '../../services/privateApi.jsx'
import { ImageToBase64 } from '../../../main/utility/ImageToBase64.jsx'

const ModalCreate = ({ fetchProductData }) => {
  const [data, setData] = useState({
    title: '',
    price: '',
    desc: '',
    color_id: '',
    ram_id: '',
    capacity_id: '',
    category_id: '',
    brand_id: '',
    version_id: '',
    discount: '',
    stock: '',
    is_active: true,
    images: [],
    buttonColor: '#999'
  })

  const [colors, setColors] = useState()
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

  const handleBaseImages = async (e) => {
    const files = Array.from(e.target.files)

    const base64Images = await Promise.all(
      files.map(async (file) => {
        const base64 = await ImageToBase64(file)
        return {
          file_name: file.name,
          url: base64
        }
      })
    )
    setData((prev) => ({ ...prev, images: base64Images }))
  }

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
        const result = await readVersion(1, 100, data?.brand_id)
        setVersions(result?.data?.data?.version)
      }
    }
    fetchData()
  }, [data?.brand_id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await createProduct(data)

    if (res?.data?.code === 0) {
      setData({ title: '', price: '', desc: '', color_id: '', ram_id: '', capacity_id: '', category_id: '', discount: '', stock: '', is_active: true, images: [], buttonColor: '#000' })
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
            {/* <div className="col-md-6">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" value={data?.title} className="form-control" id="title" name='title' required onChange={handleOnChange} />
            </div> */}
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
              <label htmlFor="color_id" className="form-label">Color</label>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle cs-btn-color"
                  type="button"
                  id="colorDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ backgroundColor: data.buttonColor }}
                >
                  {data.color_id ? colors.find(c => c.id === data.color_id)?.name : 'Select Color'}
                </button>
                <ul className="dropdown-menu" aria-labelledby="colorDropdown">
                  {colors && colors.map((item, index) => (
                    <li key={`color-${index}`}>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          setData({
                            ...data,
                            color_id: item.id,
                            buttonColor: item.color_code
                          })
                          const selectedColor = colors.find(c => c.id === item.id)?.name
                          if (selectedColor) { document.getElementById('colorDropdown').textContent = selectedColor }
                        }}
                      >
                        <div className='cs-color-option' style={{ backgroundColor: item.color_code, display: 'inline-block', width: '20px', height: '20px', borderRadius: '50%', marginRight: '10px' }} />
                        {item?.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
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
              <label htmlFor="price" className="form-label">Price</label>
              <input type="text" value={data?.price} className="form-control" id="price" name='price' required onChange={handleOnChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="discount" className="form-label">Discount</label>
              <input type="text" value={data?.discount} className="form-control" id="discount" name='discount' required onChange={handleOnChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input type="text" value={data?.stock} className="form-control" id="stock" name='stock' required onChange={handleOnChange} />
            </div>
            <div className="col-md-12">
              <label htmlFor="desc" className="form-label">Description</label>
              <textarea value={data?.desc} className="form-control" id="desc" name="desc" required onChange={handleOnChange} rows="4"></textarea>
            </div>
            <div className="col-md-8">
              <label htmlFor="formFileMultiple" className="form-label">Images</label>
              <input className="form-control form-control-sm" type="file" id="formFileMultiple" multiple onChange={handleBaseImages} />
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
            {data.images.length > 0 && (
              <div className="col-12 mt-3">
                <h6>Selected Images:</h6>
                <div className="image-preview-container">
                  {data.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={image.file_name}
                      style={{ width: '82px', height: '82px', objectFit: 'cover', marginRight: '10px', marginBottom: '10px' }}
                    />
                  ))}
                </div>
              </div>
            )}
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
